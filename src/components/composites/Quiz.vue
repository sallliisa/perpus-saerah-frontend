<script setup lang="ts">
import services from '@/utils/services'
import { Tabs } from '@/components/base'
import { onMounted, ref } from 'vue'

const questions = ref<any[]>([])

const getQuestions = async () => {
  return (questions.value = [
    {
      question: 'Pertanyaan 1',
      options: [
        { option_letter: 'A', option: 'Jawaban A' },
        { option_letter: 'B', option: 'Jawaban B' },
        { option_letter: 'C', option: 'Jawaban C' },
        { option_letter: 'D', option: 'Jawaban D' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
    {
      question: 'Pertanyaan 2',
      options: [
        { option_letter: 'E', option: 'Jawaban E' },
        { option_letter: 'F', option: 'Jawaban F' },
        { option_letter: 'G', option: 'Jawaban G' },
        { option_letter: 'H', option: 'Jawaban H' },
      ],
    },
  ].map((item, index) => {
    return { question_number: index + 1, ...item }
  }))
}

onMounted(async () => {
  await getQuestions()
})

const selectedTab = ref<number>(0)
</script>

<template>
  <div class="grid grid-cols-12 gap-8">
    <div :key="selectedTab" class="col-span-7 flex flex-col gap-4">
      <Card>
        <div class="flex flex-row items-center justify-between">
          <Button :disabled="selectedTab == 0" @click="selectedTab--"><icon>arrow_back</icon></Button>
          <div class="font-bold">{{ questions[selectedTab].question_number }}</div>
          <Button :disabled="selectedTab == questions.length - 1" @click="selectedTab++"><icon>arrow_forward</icon></Button>
        </div>
      </Card>
      <Card>
        <div class="flex flex-col gap-8">
          <div>{{ questions[selectedTab].question }}</div>
          <div class="flex flex-col gap-4">
            <div v-for="option in questions[selectedTab].options" class="flex flex-row items-center gap-4">
              <button @click="questions[selectedTab].answer = option.option_letter" class="flex aspect-square items-center justify-center rounded-lg p-4 outline outline-1 outline-c-outline dark:outline-cd-outline" :class="questions[selectedTab].answer == option.option_letter ? 'bg-c-primary text-c-on-primary dark:bg-cd-primary dark:text-cd-on-primary' : ''">{{ option.option_letter }}</button>
              <div>{{ option.option }}</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
    <div class="col-span-5 flex flex-col gap-4">
      <Tabs :config="questions" :variant="'custom'" view="question_number" static v-model="selectedTab" :masterLayoutClass="'grid grid-cols-12 gap-4'">
        <template #tab="{ tab, selected, props }">
          <button class="flex aspect-square h-full w-full items-center justify-center rounded-lg p-4 outline" :class="`${selected ? 'outline-4 outline-c-info dark:outline-cd-info' : 'outline-1 outline-c-outline dark:outline-cd-outline'} ${tab.answer ? 'bg-c-primary text-c-on-primary dark:bg-cd-primary dark:text-cd-on-primary' : ''}`">
            {{ tab[props.view] }}
          </button>
        </template>
      </Tabs>
    </div>
  </div>
</template>
