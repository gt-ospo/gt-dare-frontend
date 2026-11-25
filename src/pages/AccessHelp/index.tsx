import PublicLayout from '@/components/Auth/PublicLayout'
import GuideArticle from '@/components/Documentation/GuideArticle'
import accessHelp from '../../../docs/gt-access-help.md?raw'

const AccessHelp = () => (
  <PublicLayout>
    <main>
      <GuideArticle
        markdown={accessHelp}
        backTo='/login'
        backLabel='Back to login'
      />
    </main>
  </PublicLayout>
)

export default AccessHelp
