import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://prcteksxhxhxzhdfxfka.supabase.co'; // replace with your project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByY3Rla3N4aHhoeHpoZGZ4ZmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4ODg3NTYsImV4cCI6MjA1MzQ2NDc1Nn0.kzl33vWlJulRka5yPtdHi70YoFgt934NzkBV9V8eBA4'; // replace with your public anon key

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
