import { createClient } from "@supabase/supabase-js";
import 'dotenv/config'
const supabase = createClient(process.env.DB_URL, process.env.DB_KEY);
export default supabase
