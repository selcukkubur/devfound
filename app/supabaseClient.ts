import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vbzwzmbuftahoanqreww.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiend6bWJ1ZnRhaG9hbnFyZXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxNDY5ODYsImV4cCI6MjA0NDcyMjk4Nn0.7LGTf5xc3eQ4iAfyakq39Xzq3guzQJM-E-bvPNa4Y00'; // Replace with your Supabase anon key
export const supabase = createClient(supabaseUrl, supabaseKey);
