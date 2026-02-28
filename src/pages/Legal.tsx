import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";

function PrivacyPolicyContent() {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Privacy Policy</h1>
        <p className="text-foreground-muted text-lg">Last updated: February 28, 2026</p>
      </div>
      <div className="prose prose-invert prose-lg max-w-none text-foreground-muted">
        <p>At Zemplate.ai, accessible from https://zemplate.ai, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Zemplate.ai and how we use it.</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">1. Information We Collect</h2>
        <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>Account Information:</strong> When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</li>
          <li><strong>Usage Data:</strong> We collect information on how the Service is accessed and used. This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li>
          <li><strong>Generated Content:</strong> Images and text prompts you submit to our AI models are processed to provide the service. We do not use your private generations to train our public models without explicit consent.</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">2. How We Use Your Information</h2>
        <p>We use the information we collect in various ways, including to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
          <li>Send you emails</li>
          <li>Find and prevent fraud</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">3. Log Files</h2>
        <p>Zemplate.ai follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">4. Cookies and Web Beacons</h2>
        <p>Like any other website, Zemplate.ai uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">5. GDPR Data Protection Rights</h2>
        <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>The right to access – You have the right to request copies of your personal data.</li>
          <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
          <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
          <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
          <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
          <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">6. Indian IT Act Compliance</h2>
        <p>Zemplate.ai complies with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. We employ reasonable security practices and procedures to protect your sensitive personal data or information.</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">7. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:<br />Email: hello@zemplate.ai<br />Address: VIIONR INFOTECH PVT LTD, India</p>
      </div>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Terms of Service</h1>
        <p className="text-foreground-muted text-lg">Last updated: February 28, 2026</p>
      </div>
      <div className="prose prose-invert prose-lg max-w-none text-foreground-muted">
        <p>Welcome to Zemplate.ai. These Terms of Service ("Terms") govern your use of the Zemplate.ai website, products, and services (collectively, the "Service") operated by VIIONR INFOTECH PVT LTD ("Company", "we", "us", or "our").</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to all of these Terms, you may not access or use the Service.</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">2. Accounts</h2>
        <p>When you create an account with us, you must provide accurate, complete, and up-to-date information. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">3. Credits and Payments</h2>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Credits are virtual units used to access AI generation features on the platform.</li>
          <li>Purchased credits are non-refundable except as specified in our Refund Policy.</li>
          <li>Free credits provided at signup or through promotions have no cash value and may expire.</li>
          <li>We reserve the right to change credit pricing and costs at any time.</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">4. Acceptable Use</h2>
        <p>You agree not to use the Service to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Generate content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable</li>
          <li>Generate content that infringes on the intellectual property rights of others</li>
          <li>Generate deepfake or misleading content intended to deceive</li>
          <li>Attempt to reverse-engineer, decompile, or extract hidden prompts from templates</li>
          <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">5. Intellectual Property</h2>
        <p>Images you generate using the Service are yours to use for personal and commercial purposes, subject to the restrictions in these Terms. Template prompts and the platform's design, code, and branding remain the exclusive property of VIIONR INFOTECH PVT LTD.</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">6. Limitation of Liability</h2>
        <p>In no event shall VIIONR INFOTECH PVT LTD, its directors, employees, partners, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the Service.</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">7. Termination</h2>
        <p>We may terminate or suspend your account and access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or the Service.</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">8. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at:<br />Email: hello@zemplate.ai<br />Address: VIIONR INFOTECH PVT LTD, India</p>
      </div>
    </>
  );
}

function RefundPolicyContent() {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Refund Policy</h1>
        <p className="text-foreground-muted text-lg">Last updated: February 28, 2026</p>
      </div>
      <div className="prose prose-invert prose-lg max-w-none text-foreground-muted">
        <p>At Zemplate.ai, operated by VIIONR INFOTECH PVT LTD, we strive to provide the best AI image generation experience. This Refund Policy outlines the conditions under which refunds may be issued for credit purchases made on our platform.</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">1. Credit Purchases</h2>
        <p>All credit purchases on Zemplate.ai are generally non-refundable once credits have been added to your account. Credits are digital goods that are delivered instantly upon payment confirmation.</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">2. Eligible Refund Scenarios</h2>
        <p>We may issue a refund in the following circumstances:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>Duplicate Charges:</strong> If you were accidentally charged more than once for the same purchase, we will refund the duplicate amount.</li>
          <li><strong>Service Failure:</strong> If a paid generation fails due to a server error on our end and credits were deducted but no output was delivered, we will restore the credits to your account.</li>
          <li><strong>Unauthorized Transactions:</strong> If you believe an unauthorized transaction was made on your account, contact us within 7 days of the charge.</li>
          <li><strong>Unused Credits within 48 Hours:</strong> If you purchased credits and have not used any of them, you may request a full refund within 48 hours of purchase.</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">3. Non-Refundable Items</h2>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Credits that have already been used for generations</li>
          <li>Free credits received at signup, through referrals, or promotions</li>
          <li>Credits purchased more than 48 hours ago where any credits from that purchase have been used</li>
          <li>Refund requests made after 30 days from the date of purchase</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">4. How to Request a Refund</h2>
        <p>To request a refund, please email us at <strong>hello@zemplate.ai</strong> with the following details:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Your registered email address</li>
          <li>Transaction ID or payment receipt</li>
          <li>Reason for the refund request</li>
          <li>Date of purchase</li>
        </ul>
        <p className="mt-4">We will review your request and respond within 5-7 business days.</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">5. Refund Processing</h2>
        <p>Approved refunds will be processed to the original payment method within 7-14 business days. For Indian payment methods (UPI, net banking, cards processed via Razorpay), the refund timeline may vary based on your bank's processing time.</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">6. Contact Us</h2>
        <p>For any refund-related queries, please contact us at:<br />Email: hello@zemplate.ai<br />Address: VIIONR INFOTECH PVT LTD, India</p>
      </div>
    </>
  );
}

function CookiePolicyContent() {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Cookie Policy</h1>
        <p className="text-foreground-muted text-lg">Last updated: February 28, 2026</p>
      </div>
      <div className="prose prose-invert prose-lg max-w-none text-foreground-muted">
        <p>This Cookie Policy explains how Zemplate.ai, operated by VIIONR INFOTECH PVT LTD ("we", "us", "our"), uses cookies and similar tracking technologies when you visit our website at https://zemplate.ai.</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">1. What Are Cookies?</h2>
        <p>Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help the website recognize your device and remember certain information about your visit, such as your preferences and login status.</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">2. Types of Cookies We Use</h2>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-3">Essential Cookies</h3>
        <p>These cookies are strictly necessary for the website to function. They enable core features like user authentication, session management, and security. You cannot opt out of essential cookies.</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>Authentication:</strong> Firebase authentication tokens to keep you logged in</li>
          <li><strong>Session:</strong> Session identifiers to maintain your browsing state</li>
          <li><strong>Security:</strong> CSRF tokens and other security-related cookies</li>
        </ul>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-3">Functional Cookies</h3>
        <p>These cookies allow the website to remember choices you make and provide enhanced features:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>Preferences:</strong> Remembering your display preferences (e.g., theme settings)</li>
          <li><strong>Recent Activity:</strong> Storing information about your recent generations and templates used</li>
        </ul>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-3">Analytics Cookies</h3>
        <p>We use analytics cookies to understand how visitors interact with our website. This helps us improve our Service:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>Google Analytics:</strong> Collects anonymized data about page views, session duration, and user demographics</li>
          <li><strong>Firebase Analytics:</strong> Tracks app-level events to improve user experience</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">3. Third-Party Cookies</h2>
        <p>Some cookies are placed by third-party services that appear on our pages:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>Google (Authentication & Analytics):</strong> Used for Google Sign-In and analytics tracking</li>
          <li><strong>Razorpay:</strong> Used during payment processing to ensure secure transactions</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">4. Managing Cookies</h2>
        <p>You can control and manage cookies through your browser settings. Most browsers allow you to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>View what cookies are stored and delete them individually</li>
          <li>Block third-party cookies</li>
          <li>Block cookies from specific websites</li>
          <li>Block all cookies</li>
          <li>Delete all cookies when you close your browser</li>
        </ul>
        <p className="mt-4">Please note that blocking or deleting cookies may impact your experience on Zemplate.ai, and some features may not function properly.</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">5. Updates to This Policy</h2>
        <p>We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.</p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">6. Contact Us</h2>
        <p>If you have any questions about our use of cookies, please contact us at:<br />Email: hello@zemplate.ai<br />Address: VIIONR INFOTECH PVT LTD, India</p>
      </div>
    </>
  );
}

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/privacy-policy": { title: "Privacy Policy | Zemplate.ai", description: "Privacy Policy for Zemplate.ai. Learn how we collect, use, and protect your personal information." },
  "/terms": { title: "Terms of Service | Zemplate.ai", description: "Terms of Service for Zemplate.ai. Read the terms governing your use of our AI image generation platform." },
  "/refund-policy": { title: "Refund Policy | Zemplate.ai", description: "Refund Policy for Zemplate.ai. Understand our credit refund conditions and how to request a refund." },
  "/cookie-policy": { title: "Cookie Policy | Zemplate.ai", description: "Cookie Policy for Zemplate.ai. Learn about the cookies we use and how to manage them." },
};

export function Legal() {
  const { pathname } = useLocation();
  const meta = PAGE_META[pathname] || PAGE_META["/privacy-policy"];

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO title={meta.title} description={meta.description} canonical={`https://zemplate.ai${pathname}`} />
      <Navbar />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
        {pathname === "/refund-policy" && <RefundPolicyContent />}
        {pathname === "/cookie-policy" && <CookiePolicyContent />}
        {pathname === "/terms" && <TermsContent />}
        {pathname === "/privacy-policy" && <PrivacyPolicyContent />}
        {!["/privacy-policy", "/terms", "/refund-policy", "/cookie-policy"].includes(pathname) && <PrivacyPolicyContent />}
      </main>
      <Footer />
    </div>
  );
}
