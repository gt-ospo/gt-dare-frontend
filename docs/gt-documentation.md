# Maintaining the GT user documentation

The public pages cover account access. The protected manual covers using the
workspace. Keep those purposes separate so signed-in users do not have to read
signup instructions before finding a task.

| Page | Content source | Application entry |
|---|---|---|
| Access and account help | `docs/gt-access-help.md` | `/access-help`; `/user-guide` is its retained alias |
| User Manual | `docs/gt-user-guide.md` | `/help/user-guide` and `/help/user-guide/:topicId` |
| Start here | `src/pages/Training/lessons.ts` | `/training` publicly; `/help/training` inside the workspace |

The manual Markdown is split into topics by `src/pages/UserGuide/topics.ts`.
Keep each `##` title aligned with its metadata and links when renaming a topic.
The ten topics cover a first conversation, navigation, models, sources, prompts,
agents, workflows, wallets, settings and troubleshooting. The existing CMU Help
page and help agent are separate features.

Training behavior and screenshot requirements are in [gt-training.md](gt-training.md).
Keep original captures in `public/training-assets/`. The practice file is
`public/training-assets/workshop-note.txt`; its details are fictional. Changing
lesson IDs or the progress storage key affects saved progress, so review that
behavior before changing them.

## Editing and checking

1. Check the instruction against the GT application and its source. Use the exact
   visible control name and explain what users should see after the action.
2. Check links against `src/routes/AppRoutes.tsx` and topic IDs. A form control
   such as **Select Model** needs an explanation, not an invented page link.
3. Review screenshots at their displayed size on desktop and mobile. Hide account
   details, keys and signed links. A sample screenshot does not prove a live model
   request or upload succeeded.
4. Run `npm run app:build` and `npm run lint`. Check only changed files for
   formatting; do not run a repository-wide formatter for a content correction.
5. Check the rendered pages, topic navigation, theme, downloads and training
   progress where affected. Run the signup regression tests if login or account
   guidance changes. Record checks that were not performed.

These Markdown files are imported into the application bundle. Editing them in
GitHub does not update a running site; build and test a new frontend image before
deployment. They are separate from the generated `docs-site/` site.

## Release boundaries

Use the GT frontend `deploy` branch as the release target. Upstream contributions
currently target `dev`; keep PACE mail, VPN and host configuration in the GT fork.
Before merging upstream, compare the whole diff and retest GT navigation, signup
gates and documentation routes.

The November 14 local checkout also contains an unreleased initial-decline
reapplication feature. Its `/request-review` instructions belong with that backend
and frontend release. A documentation-only release based on the current deployed
image must continue directing declined applicants to GT-OSPO.

Operator instructions, HTTPS certificate paths and runtime proxy configuration
belong in the `gt-ospo/gt-dare-deploy` repository. They do not belong in the public
user manual. Never copy environment secrets or private keys into either repository.
