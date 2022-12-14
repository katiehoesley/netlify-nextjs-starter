import type { GetStaticPropsContext } from "next";
import Head from "next/head";
import { Layout } from "@vercel/examples-ui";
import { Navbar, Footer, UIComponent, Container } from "@components/ui";
import { getAllEntries } from "@lib/cms/cmsEntries";

export async function getStaticProps() {
  try {
    const entry = await getAllEntries("home_page");
    const header = await getAllEntries("header");
    const navBar: any = header[0] || null;
    if (entry) {
      return {
        props: {
          ...entry[0],
          navBar,
        },
        revalidate: 1,
      };
    }

    throw new Error("Entry is not valid");
  } catch (err) {
    console.log(err);
  }
}

function Index(props: any) {
  const { modular_blocks = [], navBar } = props;
  return (
    <>
      <Head>
        <title>BigCommerce Example</title>
        <meta
          name="description"
          content="This is a basic example outlining how to use BigCommerce"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Navbar data={navBar} />
        {/*// @ts-ignore*/}
        {modular_blocks.map(({ component }, i) => {
          const { component_type, component_variant, ...rest } = component;
          return (
            <UIComponent
              key={`${component_type}_${i}`}
              componentType={component_type}
              componentVariant={component_variant}
              data={rest}
              priority={i < 3}
            />
          );
        })}
      </Container>
      <Footer pages={[]} />
    </>
  );
}

Index.Layout = Layout;

export default Index;
