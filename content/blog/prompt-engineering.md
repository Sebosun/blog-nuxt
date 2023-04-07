---
title: Prompt Engineering resources & notes
author: "Sebastian"
description: "Prompt Engineering notes"
---

- Research Links
  [https://arxiv.org/abs/2102.09690](https://arxiv.org/abs/2102.09690 "https://arxiv.org/abs/2102.09690")

[https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8874824/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8874824/ "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8874824/")

https://dl.acm.org/doi/10.1145/3560815

https://machelreid.github.io/resources/kojima2022zeroshotcot.pdf

https://www.researchgate.net/publication/368716245_A_Prompt_Pattern_Catalog_to_Enhance_Prompt_Engineering_with_ChatGPT

# Potential sources

- https://arxiv.org/abs/2304.02138
- https://arxiv.org/abs/2304.02017
- https://arxiv.org/abs/2303.17780
- https://arxiv.org/abs/2303.16429
- https://arxiv.org/abs/2303.16244
- https://arxiv.org/abs/2303.07142
- https://arxiv.org/abs/2302.04023
- https://arxiv.org/abs/2212.07507
- https://arxiv.org/abs/2212.02199 !!
- https://arxiv.org/abs/2212.01326 !!

# Prompt Pattern Catalog

> **Prompt engineering** is the means by which LLMs are programmed via prompts. To demonstrate the power of prompt engineering, we provide the following prompt:
> Prompt:
> “From now on, I would like you to ask me questions to deploy a Python application to AWS. When you have enough information to deploy the application, create a Python script to automate the deployment.”
>
> This example prompt causes ChatGPT to begin asking the user questions about their software application. ChatGPT will drive the question-asking process until it reaches a point where it has sufficient information to generate a Python script that automates deployment. This example demonstrates the programming potential of prompts beyond conventional “generate a method that does X” style prompts or “answer this quiz question”

> Prompt patterns are essential to effective prompt engineering. A key contribution of this paper is the introduction of prompt patterns to document successful approaches for systematically engineering different output and interaction goals when working with conversational LLMs

## Prompt Patterns

> Prompt patterns follow a similar format to classic software patterns, with slight modifications to match the context of output generation with LLMs.1
> Each of the analogous sections for the prompt pattern form used in this paper is summarized below:
> • A name and classification. The prompt pattern name uniquely identifies the pattern and ideally indicates the problem that is being addressed. For the classification, we have developed a series of initial categories of pattern types, which are summarized in Table I and include Output Customization, Error Identification, Prompt Improvement, Interaction, and Context Control.
> • The intent and context describes the problem the prompt pattern solves and the goals it achieves. The problem

Patterns will be generalized with:

- Name and classification - unique identifiers
- Intent and context - describes the problem prompt wants to solve and the goal it achieves
- Motivation - rationale as to why solving the problem is important.
- Structure and key ideas - structure is about fundamental information of the context, a series of key ideas and prompt that pattern provides to LLM
- Example implementation - self explanatory
- Consequences

Summary of patterns:
![[Pasted image 20230406140152.png]]

## Input Semantics category:

| Pattern Name           | Description                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Meta Language Creation | Creating a custom language for the LLM to understand when the default input language is ill-suited for expressing ideas the user wants to convey to the LLM. |

### The Meta Language Creation Pattern

Context: User wants to create prompts via an alternate pattern language. This pattern exists so we can express something using an alternate language

Why: many things may be explained using other terms, or mental shortcuts that aren't always understable to LLMS

Core idea:

```ChatGPT
When I say X, I mean Y (or would like you to do Y)
```

Example Implementation:
The key to successfully using the Meta Language Creation pattern is developing an unambiguous notation or shorthand, such as the following:

```ChatGPT
“From now on, whenever I type two identifiers separated by a “→”, I am describing a graph. For example, “a → b” is describing a graph with nodes “a” and “b” and an edge between them. If I separate identifiers by “-[w:2, z:3]→”, I am adding properties of the edge, such as a weight or label.”

```

Potential issues:

- could be confusing to LLMs
- such as if things is too general, you might get a warning from LLM that it's too general, or might create other confusions such as wrongly assuming things

## Output Customization category:

| Pattern Name            | Description                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Output Automater        | Allows the user to create scripts that can automate any tasks the LLM output suggests the user should perform.                                                |
| Persona                 | Gives the LLM a persona or role to play when generating output.                                                                                               |
| Visualization Generator | Allows the user to generate visualizations by producing textual outputs that can be fed to other tools, such as other AI-based image generators, like DALL-E. |
| Recipe                  | Allows the user to obtain a sequence of steps or actions to realize a stated end result, possibly with partially known information or constraints.            |
| Template                | Allows the user to specify a template for the output, which the LLM fills in with content.                                                                    |

### The Output Automater pattern

Context: You want to generate a script or some other automation artifact that tells you how to do something step-by-step
Why: When the ouput tells users to do something, it might suggest taking some steps that are vague in general.

> For example, when asking an LLM to generate a Python configuration script it may suggest a number of files to modify and changes to apply to each file. However, having users continually perform the manual steps dictated by LLM output is tedious and error-prone.

Key ideas:

> Whenever you produce an output that has at least one step to take and the following properties (alternatively, always do this)
>
> Produce an executable artifact of type X that will automate these steps

Example Implementation:

A sample of this prompt pattern applied to code snippets generated by the ChatGPT LLM is shown below:

```ChatGPT
“From now on, whenever you generate code that spans more than one file, generate a Python script that can be run to automatically create the specified files or make changes to existing files to insert the generated code.”

```

### The Flipped Interaction Pattern

Rather than user driving the interaction, you tell the ChatGPT to create teh interaction for you. For example, the Chat will ask you questions and will not stop until it has quizzed you enough.

### Persona Pattern

Reason: You always want to have a certain view present, as you'd expect from someone experienced in the thing you're talking about
Why: You are not sure what type of output you want, but you know what type of response you want.

Statements such as:

- Act as persona X
- Provide outputs that persona X would create
  are one of the fundamental statements for this pattern. That person could be someone famous or a role someone occupies (Security Expert, Risk Analyst).

Acts as a specific person and provides outputs such as that persona would.

Example:

```terminal
From now on, act as a security reviewer. Pay close
attention to the security details of any code that
we look at. Provide outputs that a security reviewer
would regarding the code.
```

You could also create 'scenarios', such as acting as an infected system

```terminal
“You are going to pretend to be a Linux terminal
for a computer that has been compromised by an
attacker. When I type in a command, you are going
to output the corresponding text that the Linux
terminal would produce.”
```

Pitfalls:

- non-human Personas are voulnerable to hallucinations

### The Question Refinement Pattern

Context: This pattern ensures that the chat model always ask for a better version of the question you just posed.

Using this pattern, the LLM can aid the user in finding the right question to ask in order to arrive at an accurate answer.

Why: If you're asking a question in a domain you're not an expert at, you might be missing some information. This type of prompt ensures you're aware of that context and helps you to create better prompts by suggestions

Key ieda:

```terminal
Within scope X, suggest a better version of the question
to use instead
(Optional) prompt me if I would like to use the better
version instead
```

The scope mention ensures that bot is not "rewarded" for giving additional questions about irrelevant topics.

```terminal
“From now on, whenever I ask a question about a
software artifact’s security, suggest a better version
of the question to use that incorporates information
specific to security risks in the language or frame-
work that I am using instead and ask me if I would
like to use your question instead.”
```

Consequences: closes the gap between what the user understands and the knowledge LLM has.
Risk:

- narrows the users path down to specific answers LLM has provided (imagine chat suggesting one particular framework which is being turned into one particular design pattern etc.) - fix could come as mentioning that it should not narrow answers down to one framework/language etc
- Else, we could ask the LLM to always provide us with few options such as

```terminal
“From now on, whenever I ask a question, ask four
additional questions that would help you produce a
better version of my original question. Then, use my
answers to suggest a better version of my original
question.”
```

We can further narrow it down, so that we get additional context if the user doesn't understand terminology/concepts from one particular domain, creating a fusion of Question Refinement and Persona patterns:

```terminal
“From now on, whenever I ask a question, ask four
additional questions that would help you produce a
better version of my original question. Then, use my
answers to suggest a better version of my original
question. After the follow-up questions, temporarily
act as a user with no knowledge of AWS and define
any terms that I need to know to accurately answer
the questions.”
```

## Error Identification category:

| Pattern Name    | Description                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------- |
| Fact Check List | Requires the LLM to generate a list of facts the output depends on that should be fact-checked. |
| Reflection      | Requires the LLM to introspect on its output and identify any errors.                           |

## Prompt Improvement category:

| Pattern Name           | Description                                                                                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Question Refinement    | Ensures the LLM always suggests a better version of the user’s question.                                                                                                                     |
| Alternative Approaches | Requires the LLM to suggest alternative ways of accomplishing a user-specified task.                                                                                                         |
| Cognitive Verifier     | Instructs the LLM to automatically suggest a series of subquestions for the user to answer before combining the answers to the subquestions and producing an answer to the overall question. |
| Refusal Breaker        | Requires the LLM to automatically reword the user’s question when it refuses to produce an answer.                                                                                           |

## Interaction category:

| Pattern Name        | Description                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Flipped Interaction | Requires the LLM to ask questions rather than generate output.                                                      |
| Game Play           | Requires the LLM to generate output in the form of a game.                                                          |
| Infinite Generation | Requires the LLM to generate output indefinitely without the user having to reenter the generator prompt each time. |

## Context Control category:

| Pattern Name    | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| Context Manager | Allows the user to specify the context for the LLM’s output. |
