/**
 * Miscalleneous Type Definitions
 *
 * Defined here to prevent circular deps
 */

export type ActionResponse = {
  success: boolean;
  text: string;
  preventRetry?: boolean;
};
