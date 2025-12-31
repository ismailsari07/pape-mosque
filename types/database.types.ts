export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          role: "admin";
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: "admin";
          created_at?: string;
        };
        Update: {
          email?: string;
          role?: "admin";
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          day: string;
          time: string;
          phone: string | null;
          is_recurring: boolean;
          is_featured: boolean;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          day: string;
          time: string;
          phone?: string | null;
          is_recurring?: boolean;
          is_featured?: boolean;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          day?: string;
          time?: string;
          phone?: string | null;
          is_recurring?: boolean;
          is_featured?: boolean;
          display_order?: number;
          is_active?: boolean;
        };
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          role: string;
          phone: string | null;
          email: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role: string;
          phone?: string | null;
          email?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          role?: string;
          phone?: string | null;
          email?: string | null;
          display_order?: number;
          is_active?: boolean;
        };
      };
    };
  };
}
