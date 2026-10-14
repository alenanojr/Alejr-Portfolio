import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLenis } from "@/hooks/useLenis";
import { seo } from "@/data/seo";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTopButton } from "@/components/layout/BackToTopButton";
import { Toaster } from "@/components/ui/sonner";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";

function App() {
  useLenis();

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords.join(", ")} />
        <link rel="canonical" href={seo.siteUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.siteUrl} />
        <meta property="og:image" content={`${seo.siteUrl}${seo.ogImage}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={`${seo.siteUrl}${seo.ogImage}`} />
      </Helmet>

      <LoadingScreen />
      <ScrollProgressBar />
      <CursorGlow />
      <Navbar />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <BackToTopButton />
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
