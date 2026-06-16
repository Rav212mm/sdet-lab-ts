// Odpowiednik Java record SauceDemoUser + enum Role
export enum Role {
  STANDARD = 'standard_user',
  LOCKED = 'locked_out_user',
  PROBLEM = 'problem_user',
  PERFORMANCE_GLITCH = 'performance_glitch_user',
  ERROR = 'error_user',
  VISUAL = 'visual_user',
}

export interface SauceDemoUser {
  username: string;
  password: string;
  role: string;
}