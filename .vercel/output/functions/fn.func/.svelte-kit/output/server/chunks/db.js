import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://epgnxvfwgbmjqoyrnbcz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZ254dmZ3Z2JtanFveXJuYmN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYzMDA2MjUsImV4cCI6MjAwMTg3NjYyNX0.hD701aKdO8rhcmV4Rjw5VdkO7NjIdr2J3ctoYMrkBeg",
  {
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  }
);
export {
  supabase as s
};
