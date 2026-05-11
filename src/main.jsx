import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Camera, LogOut, Pencil, Plus, Save, Search, Trash2, Wine, X } from 'lucide-react';
import { supabase } from './supabase';
import { APP_CONFIG } from './config';
import './style.css';

const emptyWine = Object.fromEntries(APP_CONFIG.fields.map((f) => [f.key, '']));

function groupFields(fields) {
  return fields.reduce((groups, field) => {
    const group = field.group || 'Weitere Angaben';
    groups[group] ||= [];
    groups[group].push(field);
    return groups;
  }, {});
}

function App() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [wines, setWines] = useState([]);
  const [form, setForm] = useState({ ...emptyWine, id: null, bild_url: '' });
  const [imageFile, setImageFile] = useState(null);
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const groupedFields = useMemo(() => groupFields(APP_CONFIG.fields), []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => setSession(newSession));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) loadWines();
  }, [session]);

  async function signIn(event) {
    event.preventDefault();
    setLoginMessage('');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin }
    });
    setLoginMessage(error ? error.message : 'Login-Link wurde versendet. Bitte E-Mail öffnen.');
  }

  async function loadWines() {
    const { data, error } = await supabase.from('wines').select('*').order('created_at', { ascending: false });
    if (!error) setWines(data || []);
  }

  async function uploadImage(wineId) {
    if (!imageFile) return form.bild_url || '';
    const ext = imageFile.name.split('.').pop() || 'jpg';
    const path = `${wineId}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from(APP_CONFIG.bucketName).upload(path, imageFile, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from(APP_CONFIG.bucketName).getPublicUrl(path);
    return data.publicUrl;
  }

  async function saveWine(event) {
    event.preventDefault();
    if (!form.name?.trim()) return;
    setLoading(true);
    try {
      const wineId = form.id || crypto.randomUUID();
      const bild_url = await uploadImage(wineId);
      const payload = { ...form, id: wineId, bild_url };
      delete payload.created_at;
      const { error } = await supabase.from('wines').upsert(payload);
      if (error) throw error;
      setForm({ ...emptyWine, id: null, bild_url: '' });
      setImageFile(null);
      setShowForm(false);
      await loadWines();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteWine(id) {
    if (!confirm('Diesen Wein wirklich löschen?')) return;
    const { error } = await supabase.from('wines').delete().eq('id', id);
    if (error) alert(error.message);
    await loadWines();
  }

  const filteredWines = wines.filter((wine) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return Object.values(wine).join(' ').toLowerCase().includes(q);
  });

  if (!session) {
    return <main className="login"><section className="card"><Wine size={42}/><h1>{APP_CONFIG.appTitle}</h1><p>Private Weinverkostungs-App. Melde dich per E-Mail-Link an.</p><form onSubmit={signIn}><input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="deine@email.de" required/><button>Login-Link senden</button></form>{loginMessage && <p className="hint">{loginMessage}</p>}</section></main>;
  }

  return <div className="page"><header className="hero"><div><p className="eyebrow"><Wine size={16}/> Private Verkostungsdatenbank</p><h1>{APP_CONFIG.appTitle}</h1><p>Erfasse, bewerte und finde deine Weine später wieder.</p></div><div className="actions"><button onClick={()=>setShowForm(true)}><Plus size={18}/> Neuer Wein</button><button className="secondary" onClick={()=>supabase.auth.signOut()}><LogOut size={18}/> Logout</button></div></header>

  <section className="search"><Search size={20}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Suche nach Name, Region, Rebsorte, Aromen, Bewertung ..."/></section>

  {showForm && <section className="card"><form onSubmit={saveWine} className="form"><div className="formTop"><h2>{form.id ? 'Wein bearbeiten' : 'Neuen Wein erfassen'}</h2><button type="button" className="icon" onClick={()=>setShowForm(false)}><X size={20}/></button></div><label className="photo"><span><Camera size={18}/> Etikettfoto</span><input type="file" accept="image/*" capture="environment" onChange={(e)=>setImageFile(e.target.files?.[0] || null)}/>{(form.bild_url || imageFile) && <img alt="Etikett" src={imageFile ? URL.createObjectURL(imageFile) : form.bild_url}/>}</label>{Object.entries(groupedFields).map(([group, fields]) => <div key={group}><h3>{group}</h3><div className="grid">{fields.map(field => <label key={field.key} className={field.type === 'textarea' ? 'wide' : ''}>{field.label}{field.required ? ' *' : ''}{field.type === 'textarea' ? <textarea value={form[field.key] || ''} onChange={(e)=>setForm({...form,[field.key]:e.target.value})}/> : field.type === 'select' ? <select value={form[field.key] || ''} onChange={(e)=>setForm({...form,[field.key]:e.target.value})}>{field.options.map(o => <option key={o} value={o}>{o || 'Bitte auswählen'}</option>)}</select> : <input type={field.type} min={field.min} max={field.max} value={form[field.key] || ''} onChange={(e)=>setForm({...form,[field.key]:e.target.value})} required={field.required}/>}</label>)}</div></div>)}<button disabled={loading} className="save"><Save size={18}/> {loading ? 'Speichere ...' : 'Speichern'}</button></form></section>}

  <section className="list"><h2>{filteredWines.length} Wein{filteredWines.length === 1 ? '' : 'e'}</h2>{filteredWines.map(wine => <article className="wineCard" key={wine.id}>{wine.bild_url ? <img className="thumb" src={wine.bild_url} alt={wine.name}/> : <div className="thumb empty"><Wine size={38}/></div>}<div className="wineInfo"><div className="wineHead"><div><h3>{wine.name}</h3><p>{[wine.weingut, wine.jahrgang].filter(Boolean).join(' · ')}</p><p>{[wine.land, wine.region, wine.rebsorte].filter(Boolean).join(' · ')}</p></div><strong>{wine.bewertung || '–'}<small>/100</small></strong></div><p><b>Datum:</b> {wine.verkostungsdatum || '–'}</p><p><b>Farbe:</b> {wine.farbe || '–'}</p><p><b>Nase:</b> {wine.aromen_nase || '–'}</p><p><b>Mund:</b> {wine.aromen_mund || '–'}</p><p><b>Abgang:</b> {wine.abgang || '–'}</p><div className="row"><button className="secondary" onClick={()=>{setForm(wine); setShowForm(true); window.scrollTo({top:0,behavior:'smooth'});}}><Pencil size={16}/> Bearbeiten</button><button className="ghost" onClick={()=>deleteWine(wine.id)}><Trash2 size={16}/> Löschen</button></div></div></article>)}</section></div>;
}

createRoot(document.getElementById('root')).render(<App />);
