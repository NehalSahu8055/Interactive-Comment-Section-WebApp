import { motion } from "framer-motion";
import UserSwitch from "./UserSwitch";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="rounded-r-box fixed top-0 z-30 flex min-h-screen flex-col justify-between bg-whitee px-3 py-10  shadow-[2px_3px_7px_0px_#00000012] transition-all duration-300 ease-linear dark:bg-d-whitee dark:shadow "
    >
      <span className="sr-only">Main Sidebar</span>

      <UserSwitch />
      <ThemeToggle />
    </motion.aside>
  );
}
