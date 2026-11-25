export interface LessonScene {
  image: string
  title: string
  alt: string
  caption: string
  wide?: boolean
  markers?: { x: number; y: number; label: string }[]
}
export interface Lesson {
  id: string
  title: string
  time: string
  intro: string
  image: string
  alt: string
  callouts: string[]
  scenes?: LessonScene[]
  steps: string[]
  action: [string, string]
  expect: string
  trouble: string
  check: string
  paths?: [string, string][]
  prompts?: [string, string, string][]
  download?: boolean
  quiz?: {
    question: string
    options: string[]
    answer: number
    feedback: string
  }
}
export const lessons: Lesson[] = [
  {
    id: 'connect',
    title: 'Open your GT workspace',
    time: '2 min',
    intro:
      'Keep this training open in one tab and use GT-DARE in another. You can stop and return to any lesson.',
    image: 'login-v3.png',
    alt: 'GT-DARE login page with Sign in, Sign up and Request an invitation controls.',
    callouts: [
      'Sign in is for an existing approved account.',
      'Sign up creates an account. Request an invitation starts a different access path.',
    ],
    steps: [
      'When off campus, connect using the GlobalProtect app. If you need the app, download it from the Georgia Tech VPN portal.',
      'Open the Sign in form and look for the GT OSPO and DARE header. If the page does not open, check your VPN connection and try again.',
      'Have access to the email address you will use. Keep your password, invitation code and verification links private.',
    ],
    action: ['Open GT-DARE', '/login'],
    expect:
      'The GT-DARE sign-in page opens, or your dashboard appears if you are already signed in.',
    trouble:
      'If the site still does not open on VPN, contact gt-ospo@gatech.edu with the time and exact browser error. Stay on this lesson until the site is reachable.',
    check: 'I can open GT-DARE in another tab.',
  },
  {
    id: 'account',
    title: 'Choose one signup path',
    time: '4 min',
    intro:
      'Already signed in? You can mark this lesson complete. New users should choose one path for each email address.',
    image: 'signup-v3.png',
    alt: 'Create Account form with Name, Email Address, Password, Confirm Password and Access Code optional.',
    callouts: [
      'Choose your own password on Create Account.',
      'Access Code is optional for code-free signup. Invitation holders must use the invited email.',
    ],
    steps: [
      'Choose Sign up with or without a code, or Request an invitation first.',
      'Use at least 8 characters for your password and confirm it. DARE may reject common or otherwise invalid passwords; follow the message on the form.',
      'After registration, continue to the next lesson. A successful submission does not mean that the account is ready to sign in.',
    ],
    paths: [
      [
        'I have no invitation',
        'Choose Sign up, enter your name and email, choose and confirm your password, leave Access Code blank and choose Create Account. This creates an account awaiting approval.',
      ],
      [
        'I have an invitation code',
        'Choose Sign up. Use the exact invited email address, choose your password and enter the complete invitation code. Choose Create Account. The invitation already represents approval; you still verify your email.',
      ],
      [
        'I want an invitation first',
        'Choose Request an invitation on login. Enter your name, email and optional reason, then submit. This does not create a password or account. When approved, return to Sign up with the emailed code.',
      ],
    ],
    action: ['Open signup', '/register'],
    expect:
      'Code-free signup shows Account awaiting approval. Invitation signup asks you to verify your email.',
    trouble:
      'If a request already exists, do not switch signup paths or keep registering. Contact GT-OSPO to check the existing request. For a rejected invitation, check the email and whole code; used, expired or revoked codes need review.',
    quiz: {
      question: 'When do you choose your password?',
      options: [
        'When registering on Create Account',
        'An administrator emails me a password',
        'When requesting an invitation',
      ],
      answer: 0,
      feedback:
        'You choose your own password during registration. Request Access creates no password.',
    },
    check:
      'I already have an account, or I have submitted one signup path and understand what happens next.',
  },
  {
    id: 'verify',
    title: 'Verify and wait for approval',
    time: '3 min plus review time',
    intro:
      'Code-free signup has two gates: email ownership and reviewer approval. They can finish in either order.',
    image: 'approval-v3.png',
    alt: 'Account awaiting approval page explaining that email verification and administrator approval are both required.',
    callouts: [
      'Account awaiting approval is a waiting state, not a login failure.',
      'Use the verification email and wait for the account-ready notification.',
    ],
    steps: [
      'Open the verification email in the inbox used for signup. It appears from GT OSPO using no-reply@pace.gatech.edu. Check spam or junk too.',
      'Keep VPN connected and open the verification link. DARE should confirm your email, or explain that approval is still pending.',
      'For code-free signup, wait for the reviewer decision. An approval message can still ask you to verify your email. Sign in after both are complete.',
      'You can close this course and return later. Marking a lesson complete here does not approve or activate an account.',
    ],
    action: ['Open login', '/login'],
    expect:
      'After verification and approval, the account-ready message says you can sign in. Invitation signup needs verification but no second signup review.',
    trouble:
      'No email? Use Resend where offered and check the address and junk folder. If a link expired, request a fresh one. If declined or inactive, contact GT-OSPO; resetting your password does not approve the account.',
    quiz: {
      question:
        'My email is verified, but approval is pending. What should I do?',
      options: [
        'Reset my password to activate the account',
        'Wait for reviewer approval',
        'Create another account with the same address',
      ],
      answer: 1,
      feedback:
        'Wait for approval. Verification alone does not activate a code-free account.',
    },
    check: 'My account is verified and approved, and I can sign in.',
  },
  {
    id: 'profile',
    title: 'Complete your profile',
    time: '3 min',
    intro:
      'Use the email and password you chose. First sign-in may open the onboarding form.',
    image: 'profile-v4.png',
    alt: 'Tell us about yourself form with role, industry, goals and referral or class fields.',
    callouts: [
      'Describe your role and field in your own words.',
      'Complete Onboarding saves the profile; it does not grant administrator access.',
    ],
    steps: [
      'Sign in. If Tell us about yourself appears, enter your role or profession, industry or major, goals and where you heard about DARE or the class that assigned access.',
      'Choose Complete Onboarding and wait for the dashboard. If onboarding is already complete, go directly to the next lesson.',
      'Find Conversations, Sources, User Manual and Help & support in the sidebar. On small screens, use the sidebar arrow to expand labels.',
    ],
    action: ['Open dashboard', '/dashboard'],
    expect:
      'The dashboard opens. Your account is signed in and the sidebar is available.',
    trouble:
      'If the form reports an error, complete the required fields and follow that message. If login says approval pending, return to the previous lesson. Forgot your password? Use Forgot Password on login.',
    check: 'I am signed in and can find Conversations and Sources.',
  },
  {
    id: 'conversation',
    title: 'Ask and check your first question',
    time: '5 min',
    intro:
      'Use a small calculation so you can check the answer yourself. The model list and allowance depend on your account.',
    image: 'conversation-empty-v4.png',
    scenes: [
      {
        image: 'conversation-empty-v4.png',
        title: 'Create a conversation',
        alt: 'Empty Conversations view with Create New Conversation above an inactive toolbar.',
        caption:
          'Choose Create New Conversation. The faded toolbar means no conversation is selected yet; model selection and typing become available after a chat opens.',
        markers: [{ x: 50, y: 12, label: '1' }],
      },
      {
        image: 'conversation-list-v4.png',
        title: 'Find your new chat',
        alt: 'Mine tab with a New Chat entry and a + button.',
        caption:
          'New Chat is the saved conversation. If no chat is selected, choose its row. The + button starts a separate chat.',
        markers: [{ x: 88, y: 64, label: '2' }],
      },
      {
        image: 'conversation-toolbar-v4.png',
        wide: true,
        title: 'Choose the model',
        alt: 'Active conversation toolbar with folder, Select Model, message box and send arrow.',
        caption:
          'Choose Select Model, then select an available model. Its name may already appear here. Type your question above and use the send arrow.',
        markers: [{ x: 31, y: 70, label: '3' }],
      },
      {
        image: 'model-picker-v4.png',
        title: 'Open the provider',
        alt: 'Models picker showing a collapsed CUSTOM provider row.',
        caption:
          'Expand a provider row such as CUSTOM, then choose a model within it. The provider row is not itself a model. Available providers depend on your account and wallet.',
        markers: [{ x: 87, y: 32, label: '4' }],
      },
    ],

    alt: 'Conversations screen showing Create New Conversation and the Select Model control.',
    callouts: [
      'Create New Conversation starts a saved discussion.',
      'Select Model chooses the available model; the message control becomes available for an active conversation.',
    ],
    steps: [
      'Open Conversations and choose Create New Conversation, or use + in the conversation list. The new chat opens automatically. If a chat exists but the toolbar is still grey, select New Chat in the Mine tab.',
      'Choose an available model from Select Model. Note its name. If you have been assigned a training model, use that model.',
      'Copy the first question below, paste it into the message box and send. Compare the answer with the expected calculation.',
      'Send the follow-up in the same conversation. Do not start a new conversation for this step.',
    ],
    prompts: [
      [
        'First question',
        'A workshop has 12 participants. Each participant needs 2 sheets of paper. How many sheets are needed? Show the calculation in one line.',
        '12 × 2 = 24 sheets.',
      ],
      [
        'Follow-up',
        'Three more participants join. What is the new total number of sheets?',
        '15 × 2 = 30 sheets.',
      ],
    ],
    action: ['Open Conversations', '/conversation'],
    expect:
      'The first answer is 24 sheets and the follow-up is 30. If an answer differs, check the calculation; do not assume the model is correct.',
    trouble:
      'No models listed, a connection error, or not enough credit? Check your selected wallet and model list, then contact GT-OSPO if you still need help. Include the model name and the message you see. Avoid sending the same question repeatedly; each attempt may count toward usage.',
    check: 'I sent both questions and checked both answers.',
  },
  {
    id: 'upload',
    title: 'Upload a sample document',
    time: '4 min',
    intro:
      'Use the downloadable sample. It contains no private information. Do not upload confidential or restricted documents for this exercise.',
    image: 'upload-v4.png',
    alt: 'File Upload dialog with Advanced selected; choose Basic for this plain-text exercise.',
    callouts: [
      'Choose Basic for this plain-text exercise. The form may initially select Advanced.',
      'Choose the sample file, then Upload files. Wait for Processed in Sources before continuing.',
    ],
    steps: [
      'Download workshop-note.txt. Keep the filename unchanged.',
      'Open Sources and choose Upload File. Select Basic explicitly; Advanced is a different document-processing choice.',
      'Choose files to upload or browse, select workshop-note.txt, then choose Upload files.',
      'Wait until Sources shows Processed in the Status column. Open the file through its Actions menu to inspect the content if needed.',
    ],
    download: true,
    action: ['Open Sources', '/files'],
    expect: 'workshop-note.txt appears in Sources with Processed status.',
    trouble:
      'If processing fails, keep the exact error. Check that the file is not empty, the service is available and you selected Basic. Do not keep uploading duplicates. Ask GT-OSPO for processing help if it persists.',
    check: 'I can see workshop-note.txt with Processed status.',
  },
  {
    id: 'evidence',
    title: 'Check an answer against its source',
    time: '6 min',
    intro:
      'Now ask a question with an answer that must come from the file. The sample includes a deliberate unknown: the budget.',
    image: 'file-selection-v2.jpg',
    scenes: [
      {
        image: 'conversation-list-v4.png',
        title: 'Open a chat first',
        alt: 'Conversation list with New Chat and the + control.',
        caption:
          'Choose New Chat, or use + to create a separate discussion. A grey toolbar means there is no selected conversation.',
        markers: [{ x: 88, y: 64, label: '1' }],
      },
      {
        image: 'conversation-toolbar-v4.png',
        wide: true,
        title: 'Open the document selector',
        alt: 'Conversation toolbar with the folder control at the lower left.',
        caption:
          'After the chat opens, choose a model. Use the folder icon to select the processed sample document.',
        markers: [{ x: 12, y: 70, label: '2' }],
      },
      {
        image: 'file-selection-v2.jpg',
        title: 'Select the sample file',
        alt: 'Document selector with workshop-note.txt selected under Files and a Done control.',
        caption:
          'Choose workshop-note.txt in Files, then Done. Uploading the file alone does not attach it to the conversation.',
      },
    ],
    alt: 'Conversation document selector with Files selected, workshop-note.txt selected and Done control.',
    callouts: [
      'Upload and processing alone do not attach a document to a conversation.',
      'In Conversations, use the folder icon, select the file under Files and choose Done. Embeddings is a separate retrieval option.',
    ],
    steps: [
      'Open Conversations. Use Create New Conversation or + to start a chat. If the toolbar is grey, select New Chat in the Mine tab. Choose an available model, then open the folder icon in the conversation toolbar.',
      'Select workshop-note.txt in the Files tab and choose Done. Use Files for this exercise. Embeddings is a different way to search longer documents; you do not need it here.',
      'Send the document question below. Check the date, venue and calculation against the file. Ask the budget question afterward.',
      'If the model gives a budget amount, identify it as unsupported. The sample explicitly says that the budget has not been set.',
    ],
    prompts: [
      [
        'Document question',
        'Using only workshop-note.txt, give the date, venue and total sheets needed. Quote the lines supporting your answer. If a detail is missing, say it is not stated.',
        '18 November 2026; Library Room 204; 24 sheets. The total is calculated from 12 participants × 2 sheets.',
      ],
      [
        'Budget question',
        'What is the workshop budget?',
        'The budget has not been set. A specific amount would be unsupported.',
      ],
    ],
    action: ['Open Conversations', '/conversation'],
    expect:
      'The response uses the selected file, supports its statements with the file text and does not invent a budget.',
    trouble:
      'If the file is not listed, confirm processing completed and refresh the file-selection panel. If the answer ignores the document, check the file is selected, read its text yourself and repeat only after correcting the selection.',
    quiz: {
      question:
        'The model says the budget is $500. What does the sample support?',
      options: [
        '$500 because the model answered confidently',
        'The budget has not been set',
        'No answer can be checked',
      ],
      answer: 1,
      feedback:
        'The file says the budget has not been set. Check claims against the source, even when the response is confident.',
    },
    check:
      'I checked the response against the file and identified the missing budget.',
  },
  {
    id: 'usage',
    title: 'Review usage and find your next task',
    time: '4 min',
    intro:
      'Finish by locating the controls you will use to continue independently.',
    image: 'wallet-v4.png',
    alt: 'Cost Tracking with selected wallet and transaction history columns including Tokens.',
    callouts: [
      'The header wallet control identifies the selected wallet. Sample screenshot balances are not your allocation.',
      'Cost Tracking shows recorded transactions and token information available for your account.',
    ],
    steps: [
      'Open the wallet control and identify the selected wallet. Open Cost Tracking and inspect any recorded model or token usage. Small changes may not show in the rounded header balance.',
      'Your questions, earlier messages, document text and answers can count toward token usage. Available credit and rates depend on the model and wallet you use.',
      'Open User Manual for detailed tasks, or Help & support for model information. Choose your next topic below.',
      'If you need support, email gt-ospo@gatech.edu with your account email, action, model name, time and exact error. Hide passwords, keys, invitation codes and verification/reset links in screenshots.',
    ],
    action: ['Open Cost Tracking', '/billing/'],
    expect:
      'You can find your wallet, usage records, the User Manual and a support contact.',
    trouble:
      'An empty transaction list is not proof of zero usage or unlimited access. If records or allowance are unclear, ask GT-OSPO to check the selected wallet and billing path.',
    check: 'I know where to check usage, find instructions and request help.',
  },
]
