import { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";

const supabaseAuth = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email?: string;
    phone?: string;
    role?: string;
    school_id?: string;
  };
}

// Verify Supabase JWT on every protected route
export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing authorization header" });
  }

  const token = header.slice(7);
  const { data: { user }, error } = await supabaseAuth.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  // Attach user + app metadata to request
  req.user = {
    id: user.id,
    email: user.email,
    phone: user.phone,
    role: user.user_metadata?.role,
    school_id: user.user_metadata?.school_id,
  };

  return next();
}

// Role guard — use after requireAuth
export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user?.role || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: `Requires role: ${roles.join(" or ")}` });
    }
    return next();
  };
}
