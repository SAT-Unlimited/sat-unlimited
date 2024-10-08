"use client"

import { SmallHeader } from "@/components/SmallHeader";
import { CheckIcon, Clock4Icon, RefreshCwIcon, XIcon } from "lucide-react";
import dynamic from "next/dynamic";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { indexToLetter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import Link from "next/link";

function Results() {

    useEffect(() => {

        if (!results) {
            location.href = "/";
        }

    })

    if (typeof localStorage === "undefined" || !localStorage.selectedStudyMethod) {
        if (typeof window !== "undefined") {
            location.href = "/";
        }
        return <></>;
    }

    const {results} = localStorage;

    const {answeredQuestions, correctAnswersCount, incorrectAnswersCount, time} = JSON.parse(results);

    return (
        <div className="flex flex-col">

            <SmallHeader/>

            <div className="flex flex-col items-center mt-24 animate-fade-in">

                <span className="font-bold text-[#E7C654] text-6xl mb-24">Results</span>

                <div className="flex flex-row text-7xl gap-x-20">

                    <div className="font-bold">
                        <span className="text-[#4BB268]">{correctAnswersCount}</span>
                        <span>/{answeredQuestions.length}</span>
                    </div>

                    <span className="text-[#FFF2C3]">{Math.floor((correctAnswersCount/answeredQuestions.length)*100) || 0}%</span>

                </div>

                <div className="mt-10">
                    <div className="flex flex-row font-bold gap-x-10">
                        <div className="flex flex-row gap-x-2 my-auto">
                            <Clock4Icon size={50}/>
                            <span className="text-5xl">{time}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[#4BB268] text-5xl">{correctAnswersCount}</span>
                            <span className="text-xl">Correct</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[#C34646] text-5xl">{incorrectAnswersCount}</span>
                            <span className="text-xl">Incorrect</span>
                        </div>
                    </div>
                </div>

                <div className="w-[50rem] m-20 flex flex-col">
                    <Accordion type="multiple" collapsible className="w-full">
                        {answeredQuestions.map((answeredQuestion, index) => (
                            <div className="flex flex-row" key={index}>
                                <AccordionItem value={`question-${index + 1}`} className="w-full">
                                    <AccordionTrigger className="text-left">
                                        <span className="text-3xl font-bold mr-5">
                                            {index + 1}
                                        </span>
                                        <span className="w-[90%] font-bold">
                                            {answeredQuestion.prompt}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="w-[90%] ml-[3rem]">
                                        <span className="text-lg">
                                            {answeredQuestion.passage}
                                        </span>
                                        <div className="flex flex-col gap-y-2 mt-5">
                                            {answeredQuestion.answerChoices.map((answerChoice, index) => (
                                                <Button key={index} variant="outline" size="h-adapt" className={`w-full py-4 ${
                                                    (() => {
                                                        if (answeredQuestion.correctAnswerIndex == index) {
                                                            return "bg-[#4BB268]";
                                                        }
                                                        else if (answeredQuestion.correctAnswerIndex != index && answeredQuestion.userAnswerIndex == index) {
                                                            return "bg-[#C34646]";
                                                        }
                                                    })()
                                                }`} disabled>
                                                    <div className="flex flex-row w-full">
                                                        <div className="flex outline outline-1 aspect-square h-10 text-center rounded-full mr-4 my-auto">
                                                            <span className="m-auto">
                                                                {indexToLetter(index)}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm font-normal text-left my-auto">
                                                            {answerChoice}
                                                        </span>
                                                    </div>
                                                </Button>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <div className="float-right mt-5 ml-3">
                                    {answeredQuestion.userAnswerIndex == answeredQuestion.correctAnswerIndex ? (
                                        <CheckIcon size={40} color="#4BB268"/>
                                    ) : (
                                        <XIcon size={40} color="#C34646"/>
                                    )}
                                </div>
                            </div>
                        ))}
                    </Accordion>
                    <Link href="/" className="self-center mt-16">
                        <Button className="gap-x-2 flex">
                            <RefreshCwIcon/>
                            <span>
                                Play again
                            </span>
                        </Button>
                    </Link>
                </div>

            </div>

            <Footer/>

        </div>
    )
}

export default dynamic (() => Promise.resolve(Results), {ssr: false})