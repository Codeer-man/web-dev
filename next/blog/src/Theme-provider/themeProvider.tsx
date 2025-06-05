import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { cn } from "@/lib/utils";
import {
  ThemeProvider as NextThemeProvider,
  ThemeProviderProps,
} from "next-themes";

interface ExtendedThemeProviderProps extends ThemeProviderProps {}

export default function ThemeProvider({
  children,
  ...props
}: ExtendedThemeProviderProps) {
  return (
    <NextThemeProvider {...props}>
      <Header />
      <main className={cn("container px-4 mx-0")}>{children}</main>
      <Footer />
    </NextThemeProvider>
  );
}
