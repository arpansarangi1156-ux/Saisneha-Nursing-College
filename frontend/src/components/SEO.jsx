import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, type = 'website' }) => {
  const siteName = 'Saisneha College of Nursing and Health Sciences';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={window.location.href} />
      
      {/* OpenGraph tags */}
      <meta property='og:url' content={window.location.href} />
      <meta property='og:type' content={type} />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content={siteName} />

      {/* Twitter tags */}
      <meta name='twitter:creator' content={siteName} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
    </Helmet>
  );
};

export default SEO;
