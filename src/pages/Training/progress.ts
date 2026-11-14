import { lessons } from './lessons'

export const TRAINING_STORAGE_KEY = 'gt-dare-training-v1'
export interface TrainingProgress {
  completed: string[]
  answers: Record<string, number>
}
export const emptyProgress = (): TrainingProgress => ({
  completed: [],
  answers: {},
})

export function parseProgress(raw: string | null): TrainingProgress {
  if (!raw) return emptyProgress()
  try {
    const value: unknown = JSON.parse(raw)
    if (
      !value ||
      typeof value !== 'object' ||
      !('version' in value) ||
      value.version !== 1
    )
      return emptyProgress()
    const answers: Record<string, number> = {}
    if (
      'answers' in value &&
      value.answers &&
      typeof value.answers === 'object'
    ) {
      for (const lesson of lessons) {
        const answer = Reflect.get(value.answers, lesson.id)
        if (
          lesson.quiz &&
          Number.isInteger(answer) &&
          answer >= 0 &&
          answer < lesson.quiz.options.length
        )
          answers[lesson.id] = answer
      }
    }
    const ids =
      'completed' in value && Array.isArray(value.completed)
        ? value.completed
        : []
    const completed = lessons
      .filter(
        (lesson) =>
          ids.includes(lesson.id) &&
          (!lesson.quiz || answers[lesson.id] === lesson.quiz.answer)
      )
      .map((lesson) => lesson.id)
    return { completed, answers }
  } catch {
    return emptyProgress()
  }
}
