import type { Meta, StoryObj } from "@storybook/react"
import { expect, fireEvent, fn, within } from "@storybook/test"

import allQuizzesData from "@/data/quizzes"

import { getTranslation } from "@/storybook-utils"

import { QuizContent } from "../QuizWidget/QuizContent"
import { QuizRadioGroup } from "../QuizWidget/QuizRadioGroup"

import { LAYER_2_QUIZ_KEY, layer2Questions } from "./utils"

const meta = {
  title: "Molecules / Display Content / Quiz / QuizWidget / RadioGroup",
  component: QuizRadioGroup,
  decorators: [
    (Story, { args }) => (
      <QuizContent
        title={getTranslation(allQuizzesData[LAYER_2_QUIZ_KEY].title)}
        answerStatus={args.answerStatus}
      >
        <Story />
      </QuizContent>
    ),
  ],
} satisfies Meta<typeof QuizRadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const StartQuestion: Story = {
  args: {
    answerStatus: null,
    currentQuestionIndex: 0,
    questions: layer2Questions,
    setCurrentQuestionAnswerChoice: fn(),
  },
}

const clickAnswer = async (
  selectedId: `g001-${string}`,
  answers: HTMLElement[]
) => {
  const selectedAnswer = answers.find((answer) => answer.id === selectedId)

  await expect(selectedAnswer).toBeInTheDocument()

  await fireEvent.click(selectedAnswer!)
}

export const SelectedAnswer: Story = {
  ...StartQuestion,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const answers = canvas.getAllByTestId("quiz-question-answer")

    // Click the first answer ("which is the correct answer")
    await clickAnswer("g001-a", answers)
  },
}

export const SelectedCorrectAnswer: Story = {
  args: {
    ...SelectedAnswer.args,
    answerStatus: "correct",
  },
  play: SelectedAnswer.play,
}

export const SelectedIncorrectAnswer: Story = {
  args: {
    ...SelectedAnswer.args,
    answerStatus: "incorrect",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const answers = canvas.getAllByTestId("quiz-question-answer")

    // Click the second answer ("which is the incorrect answer")
    await clickAnswer("g001-b", answers)
  },
}
