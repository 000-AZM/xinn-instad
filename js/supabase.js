import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export const supabase = createClient(
  'https://lmbppnzrlfxssaybjosz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtYnBwbnpybGZ4c3NheWJqb3N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0NzUzOTMsImV4cCI6MjA2ODA1MTM5M30.808xu7r320Ba0WImF0QeZVLDkw3l_BZmp7vsHt_sens'
);
