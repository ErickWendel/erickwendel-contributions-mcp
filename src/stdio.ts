/**
 * Stdio entry point for local development and Claude Desktop/Cursor integration
 * This file is used when running via npm start or directly
 */
import { main } from './index.ts';

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
