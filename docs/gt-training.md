# GT DARE self guided training

Start the course at `/training`, available without signing in through **Start here** in the public header. Signed-in users can open it from **Help & support**, at `/help/training`, inside the workspace. The manual remains available separately.

The course has eight lessons: connect, choose one signup path, verify and wait for review, complete onboarding, start a conversation, upload a sample document, check source evidence and review usage. Each includes an interface screenshot, numbered steps, an expected outcome, recovery instructions and a task checkpoint. Signup and evidence lessons include knowledge checks.

Users open DARE tasks in a second tab. They choose their own passwords in DARE; the training never collects passwords, email addresses or account tokens. Completing a lesson does not approve, verify or activate an account. The normal signup gates and platform permissions remain in force. Practice requests use the selected model and its configured accounting path.

## Progress

Completion and quiz choices are saved under `gt-dare-training-v1` in this browser’s local storage. Returning to the course opens the first incomplete lesson unless a lesson is specified in the URL. Progress is device-local and self-reported. It does not certify account activity or synchronize between devices. If storage is unavailable, the course works for the current visit and explains that progress cannot be saved. **Reset checklist** asks for confirmation and clears only training progress.

A lesson can be linked directly, for example `/training?lesson=upload`. Unknown lesson IDs fall back to the first incomplete lesson. The mobile lesson picker and desktop topic list use the same content.

## Sample document and screenshots

`/training-assets/workshop-note.txt` contains the practice document. Its date and venue are fictional exercise details, not an event invitation. Expected results are 24 sheets initially, 30 after the follow-up, and an unspecified budget. Users must compare answers with the source text.

Screenshots focus on the relevant form or panel, retain their aspect ratio and can be opened at full size. Conversation lessons provide numbered screenshot steps for creating/selecting a chat, choosing a model and attaching a processed file. Toolbar images scroll horizontally on narrow screens to keep their controls readable. The sample download is linked directly from the upload instruction as well as the download card. Screenshots show the light appearance; the course itself follows the selected DARE theme and colour mode.

Login, signup, approval and the v4 profile, upload, conversation, model-picker and wallet screenshots are original PNG captures supplied from the GT site. They are served without JPEG conversion. The remaining document-selection capture was made with a Mac-local fixture and sample account data. Screenshots show controls; they do not establish that a live request succeeded. No passwords, verification links or invitation codes are included. The wallet balance is an example, not the user’s allocation.

Keep screenshots and control names aligned with the GT release. The conversation document selector must show **Files** selected and the sample document checked; it is different from **Embeddings**. The upload example uses **Basic**, even if the product initially selects Advanced.

## Release checks

Build in GT production mode, run lint and changed-file formatting, then check both course routes, every screenshot, the sample download and the Help/login entry links. Test wrong quiz answers, completion gating, reload/resume, reset confirmation, small screens and keyboard controls. Verify the existing signup tests and verification/reset routes remain intact. No backend or migration is required for the course.
