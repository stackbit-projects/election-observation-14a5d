import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_API_PROJECT_ID,
  apiVersion: "2021-05-04",
  dataset: "production",
  // authenticated requests can't be cached so we have to set useCdn to false
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_ACCESS_TOKEN,
});
