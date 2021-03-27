import Head from "next/head";
import { AppProps } from "next/app";
import React, { useCallback, useState, useEffect, useMemo } from "react";
import { GeistProvider, useTheme, CssBaseline } from "@geist-ui/react";
import ThemeConfigProvider from "../lib/components/theme-config-provider";
import { getDNSPrefetchValue } from "../lib/date-transform";
import BLOG from "../blog.config";

const Application = ({ Component, pageProps }: AppProps) => {
  const theme = useTheme();
  const [themeType, setThemeType]: any = useState("light");
  const changeHandle = useCallback((isDark) => {
    const next = isDark ? "light" : "dark";
    setThemeType(next);
  }, []);

  useEffect((): any => {
    if (typeof localStorage !== "object") return null;
    const localType = localStorage.getItem("theme");
    if (!localType) return null;
    if (!["light", "dark"].includes(localType)) return null;
    setThemeType(localType);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", themeType);
  }, [themeType]);

  const domain = useMemo(() => getDNSPrefetchValue(BLOG.domain), []);

  return (
    <>
      <Head>
        <title>{BLOG.title}</title>
        {domain && <link rel="dns-prefetch" href={domain} />}
        <meta name="referrer" content="strict-origin" />
        <meta name="description" content={BLOG.description} />
        <meta property="og:site_name" content={BLOG.title} />
        <meta property="og:description" content={BLOG.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="author" content={BLOG.author} />
        <meta name="twitter:creator" content={`@${BLOG.twitter}`} />
        <meta property="og:title" content={BLOG.title} />
        <meta property="og:url" content={BLOG.domain} />
        <meta
          property="og:image"
          content={`https:${domain}/assets/og-main.png`}
        />
        <meta
          property="twitter:image"
          content={`https:${domain}/assets/og-main.png`}
        />
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
      </Head>
      <GeistProvider themeType={themeType}>
        <CssBaseline>
          <ThemeConfigProvider onChange={changeHandle}>
            <Component {...pageProps} />
          </ThemeConfigProvider>
        </CssBaseline>
        <style global jsx>{`
          .tag {
            color: ${theme.palette.accents_5};
          }

          .punctuation {
            color: ${theme.palette.accents_5};
          }

          .attr-name {
            color: ${theme.palette.accents_6};
          }

          .attr-value {
            color: ${theme.palette.accents_4};
          }

          .language-javascript {
            color: ${theme.palette.accents_4};
          }

          span[class*="class-name"] {
            color: ${theme.palette.purple};
          }

          span.token.string {
            color: ${theme.palette.accents_5};
          }

          span.keyword {
            color: ${theme.palette.success};
          }

          span.plain-text {
            color: ${theme.palette.accents_3};
          }

          body {
            overflow-x: hidden;
          }

          @media only screen and (max-width: 767px) {
            html {
              font-size: 15px;
            }
          }

          .math {
            overflow-x: auto;
          }

          a {
            word-break: break-all;
          }
        `}</style>
      </GeistProvider>
    </>
  );
};

export default Application;
