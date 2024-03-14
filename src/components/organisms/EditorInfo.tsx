import { Editor, Verbosity, WordComplexity } from '@prisma/client'
import { LevelIndicator } from '../molecules/LevelIndicator'
import { TitleValue } from '../molecules/TitleValue'

const wordComplexityIndices = {
  [WordComplexity.ELEMENTARY]: 0,
  [WordComplexity.INTERMEDIATE]: 1,
  [WordComplexity.SOPHISTICATED]: 2,
}
const verbosityIndices = {
  [Verbosity.SUCCINCT]: 0,
  [Verbosity.MODERATE]: 1,
  [Verbosity.ELABORATE]: 2,
}

export const EditorInfo = ({
  editor,
}: {
  editor: Pick<Editor, 'style' | 'wordComplexity' | 'verbosity' | 'language'>
}) => {
  return (
    <>
      <TitleValue title="Style">
        <div className="text-sm capitalize">
          {editor.style.split('_').join(' ').toLowerCase()}
        </div>
      </TitleValue>
      <TitleValue title="Language">
        <div className="text-sm capitalize">
          {editor.language.toLowerCase()}
        </div>
      </TitleValue>{' '}
      <TitleValue title="Verbosity">
        <LevelIndicator
          level={verbosityIndices[editor.verbosity]}
          total={Object.keys(Verbosity).length}
        />
      </TitleValue>
      <TitleValue title="WordComplexity">
        <LevelIndicator
          level={wordComplexityIndices[editor.wordComplexity]}
          total={Object.keys(WordComplexity).length}
        />
      </TitleValue>
    </>
  )
}
