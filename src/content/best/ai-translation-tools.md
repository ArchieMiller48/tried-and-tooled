---
title: "Best AI translation tools (2026)"
summary: "DeepL Pro Individual for a customer file; DeepL Free for one short text. Prices checked 4 Nov 2026. Not a hands-on test."
targetQuery: "best ai translation tools"
secondaryQueries:
  - "ai tool to translate a document"
  - "deepl free vs pro"
parent: "translate-a-document"
testStatus: "pending"
lastTested: null
lastVerified: 2026-11-04
picks:
  - name: "DeepL Pro Individual"
    url: "https://www.deepl.com/en/translator"
    fit: "The file is a customer's, or you will translate more than one file this month, and you want the plan the parent use case names for that job."
    why: "This is the top pick on the parent use case, read from DeepL's Pro page, not from a hands-on score. The plan finder lists Individual at €7.49 per month, billed annually, and says VAT is included. Annual billing is labelled as a 16% saving. The comparison table lists 300,000 characters a month and 3 file translations, with a file size up to 30 MB. The FAQ says that for Pro subscribers the text is never used to train DeepL's models."
    caveat: "The month-to-month euro price for Individual was not printed next to the annual figure. Team and Business amounts were on the same plan finder, and this page does not quote them, because the billing sentence read today was printed with Individual. DeepL Pro Individual has not been run."
    pricing:
      summary: "Individual €7.49/mo billed annually, VAT included. 300,000 characters a month and 3 file translations, up to 30 MB."
      sourceUrl: "https://www.deepl.com/en/pro"
      checked: 2026-11-04
    sources:
      - label: "Pro subscribers: text is not used to train DeepL's models"
        url: "https://www.deepl.com/en/pro"
    affiliateUrl: null
  - name: "DeepL Free"
    url: "https://www.deepl.com/en/translator"
    fit: "One short text, inside the free character cap, when a file translation is not the job."
    why: "This is the budget pick on the parent use case. The same comparison table lists the free version at 50,000 characters a month and 1 file translation, with a file size up to 5 MB. The parent page records a signed-out check on 3 Nov 2026: a 319-character English customer email into French. The French appeared on its own within a few seconds and was not timed. That note is not a test of this shortlist."
    caveat: "File translation was not part of the 3 Nov note. The files tab, as recorded on the parent page, says a free DeepL account is required, and the free limit stated there is 1 entire PDF, Word (.docx) or PowerPoint (.pptx) file a month. Longer text was not tested. The Pro page does not print a $0 price for the free version."
    pricing:
      summary: "Free version: 50,000 characters a month and 1 file translation, up to 5 MB."
      sourceUrl: "https://www.deepl.com/en/pro"
      checked: 2026-11-04
    sources: []
    affiliateUrl: null
  - name: "Google Cloud Translation"
    url: "https://cloud.google.com/translate"
    fit: "You are adding translation to a product via the API, not pasting one customer email into a translator."
    why: "The Cloud Translation pricing page lists Advanced NMT text with the first 500,000 characters a month free, applied as a $10 credit. The same row lists $20 after that. The worked example prices 310,000 characters as 0.31 times $20. NMT document translation for DOCX, PPT and PDF is listed at $0.08 a page. The credit note says the credit is up to $10, does not roll over, and does not apply to formatted document translations."
    caveat: "This is an API price, not a document editor. The Basic table on the same page prices the next band as $20.00 per 1,000,000 byte, which is not the same wording as the Advanced row. This page quotes the Advanced row and the example. Custom-model and LLM rows are a different meter and are not the figure above."
    pricing:
      summary: "Advanced NMT text: first 500,000 characters a month free, as a $10 credit. The row lists $20 after that. NMT document translation is $0.08 a page."
      sourceUrl: "https://cloud.google.com/translate/pricing"
      checked: 2026-11-04
    sources: []
    affiliateUrl: null
  - name: "Azure Translator"
    url: "https://azure.microsoft.com/en-us/products/ai-services/ai-translator"
    fit: "You want the free API allowance, and you can accept that the paid dollar amounts on the pricing page did not render."
    why: "The Azure Translator pricing page lists an F0 Free tier: 2 million characters a month of any combination of standard translation and custom translation training. Text translation, language detection, bilingual dictionary and transliteration are named on that free tier."
    caveat: "The S1, commitment and document prices on the same page were shown as a currency placeholder, not as a dollar amount. This page does not quote them. The Microsoft Translator product page for the apps did not state a consumer price on the lines read today, so the apps are not given a separate card."
    pricing:
      summary: "F0 Free: 2 million characters a month of standard translation and custom translation training. Paid dollar amounts on the page did not render."
      sourceUrl: "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/translator/"
      checked: 2026-11-04
    sources: []
    affiliateUrl: null
verdicts:
  - situation: "You are sending a customer's file, or more than one file this month."
    guidance: "DeepL Pro Individual at €7.49/mo billed annually. The Pro page lists 300,000 characters, 3 file translations and files up to 30 MB, and the FAQ says Pro text is not used to train the models. The parent use case names this plan for that job."
  - situation: "You have one short text and you are not translating a file."
    guidance: "DeepL Free, at 50,000 characters a month and 1 file translation up to 5 MB on the Pro page. The 3 Nov 2026 note on the parent page is a 319-character email, signed out. It does not cover a file."
  - situation: "You are building translation into software."
    guidance: "Google Cloud Translation's Advanced NMT row: the first 500,000 characters a month are free, then the row lists $20, and document pages are $0.08. Azure Translator F0 lists 2 million characters a month free. Neither card is a place to paste a customer email, and Azure's paid dollar amounts were not readable."
  - situation: "The free plan has to carry a long file or a second file."
    guidance: "Do not use DeepL Free for that. The Pro page caps the free version at 1 file and 5 MB, against 3 files and 30 MB on Individual. The parent use case names Free as the option to avoid for a long or repeat file."
faqs:
  - question: "What is the best AI tool to translate a document?"
    answer: "For a file or a customer text, the parent use case names DeepL Pro Individual at €7.49/mo billed annually, with 300,000 characters and 3 file translations. For one short text, it names DeepL Free at 50,000 characters and 1 file. Google Cloud Translation and Azure Translator are on this page because an API allowance could be read on 4 Nov 2026. This is not a hands-on ranking."
  - question: "Has DeepL Free been tried?"
    answer: "Yes, once, and only as text. On 3 Nov 2026, signed out and with no account, a 319-character English customer email was translated into French. The French appeared on its own within a few seconds and was not timed. File translation was not tested. DeepL Pro Individual was not part of that check. The note is on the translate page. The standard task, the same 800-word page and the same 5-page PDF, has not been run."
  - question: "Does DeepL train on the file?"
    answer: "DeepL's Pro FAQ says that for Pro subscribers the text is never used to train its models. That sentence is about Pro subscribers. This page does not describe what the free version does with the text. The free file cap, 1 file and 5 MB, is a separate limit on the comparison table."
  - question: "Why is the Google Translate app missing?"
    answer: "A tool is on this page only when a price or a free allowance could be read on the vendor's own site on 4 Nov 2026. Cloud Translation's character allowance was on the pricing page. A consumer Google Translate price was not. The Microsoft Translator app page also did not state a consumer price. Azure's F0 free tier did, so Azure is listed, and its paid dollar amounts were not."
  - question: "Which plan should you avoid for a second file in the same month?"
    answer: "DeepL Free. The Pro page lists 1 file translation a month, up to 5 MB. Individual lists 3 files, up to 30 MB. The parent use case names Free as the plan to avoid for a long or repeat file. No file has been uploaded for this page."
---

The order follows the parent use case, then the API translators whose allowances could be read today. DeepL Pro Individual is first because that page names it for a customer file. DeepL Free is second because that page names it for one short text. Google Cloud Translation and Azure Translator are here for a product that calls an API, not because a shared document was run through them.

Prices checked 4 Nov 2026. DeepL's prices are in euros, as the Pro page publishes them, with VAT included. Google's and Microsoft's pages are in US dollars where a dollar amount was printed. Nothing here is converted to pounds. Where a paid price did not render as a number, it is left out.

DeepL's €7.49, the 16% annual label, the character and file caps, and the Pro training sentence are from deepl.com/en/pro. Google's 500,000-character credit, the $20 NMT row and the $0.08 page price are from cloud.google.com/translate/pricing. Azure's 2 million free characters are from the Azure Translator pricing page. The paid Azure amounts on that page were a placeholder.

The 3 Nov 2026 DeepL Free note is the one already on [Translate a document](../../use-cases/translate-a-document/). It is also listed on [Tested by us](../../tested/). After the translation, edit the voice on [Proofread and edit a piece of writing](../../use-cases/proofread-and-edit/).

<h2>Comparison</h2>
<p>Read down the parent use case first. The API rows are a different job. Not a tested ranking.</p>
<div class="table-scroll">
<table>
  <thead>
    <tr><th>Tool</th><th>Price checked 4 Nov 2026</th><th>Fit</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>DeepL Pro Individual</td>
      <td>€7.49/mo billed annually, VAT included. 300,000 characters and 3 files, up to 30 MB. <a href="https://www.deepl.com/en/pro">source</a></td>
      <td>Customer file, or more than one file this month</td>
    </tr>
    <tr>
      <td>DeepL Free</td>
      <td>50,000 characters and 1 file, up to 5 MB. No $0 printed. <a href="https://www.deepl.com/en/pro">source</a></td>
      <td>One short text. File translation was not tested</td>
    </tr>
    <tr>
      <td>Google Cloud Translation</td>
      <td>Advanced NMT: first 500,000 characters a month free, then $20 on that row. Documents $0.08 a page. <a href="https://cloud.google.com/translate/pricing">source</a></td>
      <td>An API, not a paste box</td>
    </tr>
    <tr>
      <td>Azure Translator F0</td>
      <td>2 million characters a month free. Paid dollar amounts did not render. <a href="https://azure.microsoft.com/en-us/pricing/details/cognitive-services/translator/">source</a></td>
      <td>An API free tier. Paid price left out</td>
    </tr>
  </tbody>
</table>
</div>
