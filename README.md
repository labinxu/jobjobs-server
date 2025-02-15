This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## create the secret enrionment variable
run : npx auth secret
## fixed Error Shadcn `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users
 
     if (isMobile) {
+      console.log("Mobile sidebar");
       return (
         <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
+          <SheetTitle className="hidden" />
+          <SheetDescription className="hidden" />
           <SheetContent
           ##
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
## https://next-intl.dev/docs/getting-started/app-router/without-i18n-routing
The locale that was provided in i18n/request.ts is available via getLocale and can be used to configure the document language. Additionally, we can use this place to pass configuration from i18n/request.ts to Client Components via NextIntlClientProvider.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
