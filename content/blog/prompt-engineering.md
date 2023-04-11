---
title: Prompt Engineering resources & notes
author: "Sebastian"
description: "Prompt Engineering notes"
---

[Prompt Engineering resources & notes](https://ainuxtnotes.netlify.app/blog/prompt-engineering)

- Research Links[]
  [https://arxiv.org/abs/2102.09690](https://arxiv.org/abs/2102.09690 "https://arxiv.org/abs/2102.09690")

[https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8874824/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8874824/ "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8874824/")

https://dl.acm.org/doi/10.1145/3560815

https://machelreid.github.io/resources/kojima2022zeroshotcot.pdf

https://www.researchgate.net/publication/368716245_A_Prompt_Pattern_Catalog_to_Enhance_Prompt_Engineering_with_ChatGPT

https://arxiv.org/abs/2304.02138

https://arxiv.org/abs/2304.02017

https://arxiv.org/abs/2303.17780

https://arxiv.org/abs/2303.16429

https://arxiv.org/abs/2303.16244

https://arxiv.org/abs/2303.07142

https://arxiv.org/abs/2302.04023

https://arxiv.org/abs/2212.07507

https://arxiv.org/abs/2212.02199 !!

https://arxiv.org/abs/2212.01326 !!

https://www.reddit.com/r/ChatGPT/comments/12bphia/advanced_dynamic_prompt_guide_from_gpt_beta_user/

https://www.reddit.com/r/ChatGPT/comments/120oq1x/i_asked_gpt4_to_write_a_book_the_result_echoes_of/

https://www.reddit.com/r/ChatGPT/comments/12asqzk/rant_gpt4_overhype_lets_get_real_about_prompt/

https://www.reddit.com/r/ChatGPT/comments/11rq94s/my_first_token_reduction_strategy_in_gpt4_ask_it/

https://www.reddit.com/r/ChatGPT/comments/120fx2v/i_like_letting_chatgpt_rate_my_prompts_before/

https://www.reddit.com/r/ChatGPT/comments/129ltu5/can_chatgpt_really_keep_a_secret_see_my/

https://www.reddit.com/r/ChatGPT/comments/11t0cag/im_really_sick_of_chatgpt_wasting_half_my_tokens/

# Prompt Pattern Catalog Notes

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

## Input Semantics category:

| Pattern Name           | Description                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Meta Language Creation | Creating a custom language for the LLM to understand when the default input language is ill-suited for expressing ideas the user wants to convey to the LLM. |

#### The Meta Language Creation Pattern

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

#### The Output Automater pattern

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

#### Persona Pattern

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

#### Visualization Generator Pattern

Context:

- Using text LLMs to generate visualization for other visualization tools such as DALL-E or Graphviz.
  Why:
- LLMs generally produce text and cant produce image, hence, this would help with generating a tex tthat can be plugged into another program

Core ideas:

> Generate an X that I can provide to tool Y to visualize

This prompt also specifies that it's not LLMs job to visualize it.

```ChatGTP
Example Implementation:
“Whenever I ask you to visualize something, please
create either a Graphviz Dot file or DALL-E prompt
that I can use to create the visualization. Choose
the appropriate tools based on what needs to be
visualized.
```

#### Template Patern

Context:

- The intent of the pattern is to ensure an LLM's output follows a precise template in terms of structure.
  Why:
- Sometimes output must have a certain format that's not known to the LLM
- LLM must then be instructed on what that format is and where different parts of it output should go
- This pattern is useful when the target format is not known to the LLM, or when there is a large amount of variation in how the data could be represented within that format.

Key ideas: - I am going to provide a template for your output - X is my placeholder for content - Try to fit the output into one or more of the placehold-
ers that I list - Please preserve the formatting and overall template that
I provide - This is the template: PATTERN with PLACEHOLDERS

Example Implementation:

```ChatGPT
I am going to provide a template for your output. Everything in all caps is a placeholder. Any time that you generate text, try to fit it into one of the placeholders that I list. Please preserve the formatting and overall template that I provide at https://myapi.com/NAME/profile/JOB
```

Sample is shown after the propt is provided

```ChatGPT
User: “Generate a name and job title for a person”
ChatGPT: “https://myapi.com/Emily Parker/profile/
Software Engineer”
```

Possible issues:

- LLMs will typically follow the template, but it may be harder to eliminate any additional text being generated beyond the template without experimentation with prompt wording

## Error Identification category:

| Pattern Name    | Description                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------- |
| Fact Check List | Requires the LLM to generate a list of facts the output depends on that should be fact-checked. |
| Reflection      | Requires the LLM to introspect on its output and identify any errors.                           |

#### The Fact Check List Pattern

Context:

- Tells the LLM to output a list of facts on which the output is based on,
- Helps the user to verify those facts and validate if the assumptions are the correct ones.

Why:

- LLMs generate convincing text that is factually incorrect
- Errors such as these can take many forms such as fake statiscits, invalid version numbers or wrong dependencies
- Users might not perform due diligence and ignore the accuracy
  Key ideas: - Generate a set of facts that are contained in the output - The set of facts should be inserted in a specific point
  in the output - The set of facts should be the fundamental facts that
  could undermine the veracity of the output if any of
  them are incorrect

Example implementation:

```ChatGPT
From now on, when you generate an answer, create
a set of facts that the answer depends on that should
be fact-checked and list this set of facts at the
end of your output. Only include facts related to
cybersecurity.
```

In this example, the fact checking is scoped only to `cybersecurity`, as that's where the user may want to be especially careful about the facts produced.

Consequences:

- Fact Check List pattern is useful for non-experts generating output
- Combining with other patterns, such as Question Refinement, can be effective
  Users can compare the fact check list to the output to verify facts and identify omissions
- Users often have sufficient knowledge to determine the completeness and accuracy of the fact check list
- Fact Check List only works for output types amenable to fact-checking

Potential issues:

- Some outputs might not be possible to fact-check to ChatGPT, such as code samples, as it is something that it cannot check

#### The Reflection Pattern

Context: To explain to the user rationale behind a given answer
Why: LLMs make mistakes with high confidence. The detailed explainations can help the users understand how exactly the model is processing the output.

Reflection helps in adressing shortcomings with incorrect, incomplete and ambigious answers.

## Prompt Improvement category:

| Pattern Name           | Description                                                                                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Question Refinement    | Ensures the LLM always suggests a better version of the user’s question.                                                                                                                     |
| Alternative Approaches | Requires the LLM to suggest alternative ways of accomplishing a user-specified task.                                                                                                         |
| Cognitive Verifier     | Instructs the LLM to automatically suggest a series of subquestions for the user to answer before combining the answers to the subquestions and producing an answer to the overall question. |
| Refusal Breaker        | Requires the LLM to automatically reword the user’s question when it refuses to produce an answer.                                                                                           |

#### The Question Refinement Pattern

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

#### The Alternative approaches pattern

**Context:** Making sure LLM offers altenrative ways of acomplishing a task - so user doesn't have a tunnel vision for one particular solution
**Why:** User might be unaware of alternative approaches - or the ones he has in mind are not best suited for the problem
**Structure:**

```ChatGPT
- Within scope X, if there are alternative ways to accom-
plish the same thing, list the best alternate approaches

- (Optional) compare/contrast the pros and cons of each
approach
- (Optional) include the original way that I asked
- (Optional) prompt me for which approach I would like
to use
```

**First prompt,** limits scope to one particular domain and instrucs LLM to suggest alternatives.

**Example implementation:**

```ChatGPT
“Whenever I ask you to deploy an application to
a specific cloud service, if there are alternative
services to accomplish the same thing with the
same cloud service provider, list the best alternative
services and then compare/contrast the pros and cons
of each approach with respect to cost, availability,
and maintenance effort and include the original way
that I asked. Then ask me which approach I would
like to proceed with.”
```

#### Cognitive Verifier

Context: LLMs can often reason better if a question is subdivided into adidtional questions, that provide answers combined into the overall answer to the original question. [^1]. The point of this pattern is to divide the question into additional questions.
Why:

- Questions might be too broad and the answer to them will similarly be too vague
- Research shows that [^1] LLMs perform better when questions are subdivided into individual questions

Key ideas:

- When you are asked a question, follow these rules
- Generate a number of additional questions that would
  help more accurately answer the question
- Combine the answers to the individual questions to
  produce the final answer to the overall question

Example Implementation:

```ChatGPT
“When I ask you a question, generate three addi-
tional questions that would help you give a more
accurate answer. When I have answered the three
questions, combine the answers to produce the final
answers to my original question.”
```

You can combine it the amount of knowledge user has

```
“When I ask you a question, generate three addi-
tional questions that would help you give a more
accurate answer. Assume that I know little about
the topic that we are discussing and please define
any terms that are not general knowledge. When
I have answered the three questions, combine the
answers to produce the final answers to my original
question.”
```

[^1]:
    D. Zhou, N. Schärli, L. Hou, J. Wei, N. Scales, X. Wang, D. Schu-
    urmans, O. Bousquet, Q. Le, and E. Chi, “Least-to-most prompting
    enables complex reasoning in large language models,” arXiv preprint
    arXiv:2205.10625, 2022.

## Interaction category:

| Pattern Name        | Description                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Flipped Interaction | Requires the LLM to ask questions rather than generate output.                                                      |
| Game Play           | Requires the LLM to generate output in the form of a game.                                                          |
| Infinite Generation | Requires the LLM to generate output indefinitely without the user having to reenter the generator prompt each time. |

#### The Flipped Interaction Pattern

Context: Telling the LLM to prompt you for information until it has decided it has enough - rather than user driving the interaction, it's the model that drives the interaction

Why: User is unsure what information it needs, the LLM can select format, questions and type of information he gets from the user for the desired outpu.

Key ideas:

> - I would like you to ask me questions to achieve X
> - You should ask questions until this condition is met or to achieve this goal (alternatively, forever)
> - (Optional) ask me the questions one at a time, two at a time, etc.

Prompt should always specify the goal of the interaction - the LLM should focus on a paricular topic or outcome.

The second idea provides context for how long should the interaction continue.

LLMs can ask multiple questions per interaction, hence the last prompt might be useful to control the number of questions asked.

Example Implementation:

```ChatGPT
 “From now on, I would like you to ask me questions to deploy a Python application to AWS. When you have enough information to deploy the application, create a Python script to automate the deployment.”
```

The more specific that prompt is, the better the outcome should be.

Problems:

- may require precise phrasing in order to get LLM to ask the appropriate number of questions and to get a good flow of the conversation

Consequences:

- Giving and end condition will limit the type of questions it will ask
- Open ended nature of it helps us making sure that some additional context that's required is not skipped
- If specific requirements are required, input them into the prompt rather than hope LLM will ask them
- The level of engagement should also be specified for best results (min: as little interaction as possible, max: confirming everystep one-by-one)

#### The Game Play Pattern

Context: - Creating a game around a certain topic. - Could be combined with Visualization Generator pattern to add imagery. - User specifies rule

Example implementation:

> “We are going to play a cybersecurity game. You are going to pretend to be a Linux terminal for a computer that has been compromised by an attacker. When I type in a command, you are going to output the corresponding text that the Linux terminal would produce. I am going to use commands to try and figure out how the system was compromised. The attack should have done one or more of the following things: (1) launched new processes, (2) changed files, (3) opened new ports to receive communi- cation, (4) created new outbound connections, (5) changed passwords, (6) created new user accounts, or (7) read and stolen information. To start the game, print a scenario of what happened that led to my investigation and make the description have clues that I can use to get started.”

(both Game Play and Persona patterns are combined in this prompt)
After which ChatGPT will pretend to be a compromised system and generate logs suiting the ptompt

#### The Infinite Generation Pattern

Context: Goal is to generate a series of outputs (that appear infinite) in order to limit users input
Why: Many tasks require repetitive application of the same promkpt to multiple concepts, CRUD tasks etc.

Key Ideas:

- I would like you to generate output forever, X output(s) at a time.
- (Optional) here is how to use the input I provide between outputs.
- (Optional) stop when I ask you to.

Example implementation:

```ChatGPT
The following is a sample infinite generation prompt for producing a series of URLs: “From now on, I want you to generate a name and job until I say stop. I am going to provide a template for your output. Everything in all caps is a placeholder. Any time that you generate text, try to fit it into one of the placeholders that I list. Please preserve the formatting and overall template that I provide: https://myapi.com/NAME/profile/JOB”
```

This prompt uses Template pattern to help us generate a continious amount of jobs/names.

## Context Control category:

| Pattern Name    | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| Context Manager | Allows the user to specify the context for the LLM’s output. |

- Research Links[]
  [https://arxiv.org/abs/2102.09690](https://arxiv.org/abs/2102.09690 "https://arxiv.org/abs/2102.09690")

[https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8874824/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8874824/ "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8874824/")

https://dl.acm.org/doi/10.1145/3560815

https://machelreid.github.io/resources/kojima2022zeroshotcot.pdf

https://www.researchgate.net/publication/368716245_A_Prompt_Pattern_Catalog_to_Enhance_Prompt_Engineering_with_ChatGPT

https://arxiv.org/abs/2304.02138
https://arxiv.org/abs/2304.02017
https://arxiv.org/abs/2303.17780
https://arxiv.org/abs/2303.16429
https://arxiv.org/abs/2303.16244
https://arxiv.org/abs/2303.07142
https://arxiv.org/abs/2302.04023
https://arxiv.org/abs/2212.07507

https://arxiv.org/abs/2212.02199 !!
https://arxiv.org/abs/2212.01326 !!

https://www.reddit.com/r/ChatGPT/comments/12bphia/advanced_dynamic_prompt_guide_from_gpt_beta_user/
https://www.reddit.com/r/ChatGPT/comments/120oq1x/i_asked_gpt4_to_write_a_book_the_result_echoes_of/
https://www.reddit.com/r/ChatGPT/comments/12asqzk/rant_gpt4_overhype_lets_get_real_about_prompt/
https://www.reddit.com/r/ChatGPT/comments/11rq94s/my_first_token_reduction_strategy_in_gpt4_ask_it/
https://www.reddit.com/r/ChatGPT/comments/120fx2v/i_like_letting_chatgpt_rate_my_prompts_before/
https://www.reddit.com/r/ChatGPT/comments/129ltu5/can_chatgpt_really_keep_a_secret_see_my/
https://www.reddit.com/r/ChatGPT/comments/11t0cag/im_really_sick_of_chatgpt_wasting_half_my_tokens/

# Prompt Pattern Catalog Notes

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

## Input Semantics category:

| Pattern Name           | Description                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Meta Language Creation | Creating a custom language for the LLM to understand when the default input language is ill-suited for expressing ideas the user wants to convey to the LLM. |

#### The Meta Language Creation Pattern

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

#### The Output Automater pattern

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

#### Persona Pattern

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

#### Visualization Generator Pattern

Context:

- Using text LLMs to generate visualization for other visualization tools such as DALL-E or Graphviz.
  Why:
- LLMs generally produce text and cant produce image, hence, this would help with generating a tex tthat can be plugged into another program

Core ideas:

> Generate an X that I can provide to tool Y to visualize

This prompt also specifies that it's not LLMs job to visualize it.

```ChatGTP
Example Implementation:
“Whenever I ask you to visualize something, please
create either a Graphviz Dot file or DALL-E prompt
that I can use to create the visualization. Choose
the appropriate tools based on what needs to be
visualized.
```

#### Template Patern

Context:

- The intent of the pattern is to ensure an LLM's output follows a precise template in terms of structure.
  Why:
- Sometimes output must have a certain format that's not known to the LLM
- LLM must then be instructed on what that format is and where different parts of it output should go
- This pattern is useful when the target format is not known to the LLM, or when there is a large amount of variation in how the data could be represented within that format.

Key ideas: - I am going to provide a template for your output - X is my placeholder for content - Try to fit the output into one or more of the placehold-
ers that I list - Please preserve the formatting and overall template that
I provide - This is the template: PATTERN with PLACEHOLDERS

Example Implementation:

```ChatGPT
I am going to provide a template for your output. Everything in all caps is a placeholder. Any time that you generate text, try to fit it into one of the placeholders that I list. Please preserve the formatting and overall template that I provide at https://myapi.com/NAME/profile/JOB
```

Sample is shown after the propt is provided

```ChatGPT
User: “Generate a name and job title for a person”
ChatGPT: “https://myapi.com/Emily Parker/profile/
Software Engineer”
```

Possible issues:

- LLMs will typically follow the template, but it may be harder to eliminate any additional text being generated beyond the template without experimentation with prompt wording

## Error Identification category:

| Pattern Name    | Description                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------- |
| Fact Check List | Requires the LLM to generate a list of facts the output depends on that should be fact-checked. |
| Reflection      | Requires the LLM to introspect on its output and identify any errors.                           |

#### The Fact Check List Pattern

Context:

- Tells the LLM to output a list of facts on which the output is based on,
- Helps the user to verify those facts and validate if the assumptions are the correct ones.

Why:

- LLMs generate convincing text that is factually incorrect
- Errors such as these can take many forms such as fake statiscits, invalid version numbers or wrong dependencies
- Users might not perform due diligence and ignore the accuracy
  Key ideas: - Generate a set of facts that are contained in the output - The set of facts should be inserted in a specific point
  in the output - The set of facts should be the fundamental facts that
  could undermine the veracity of the output if any of
  them are incorrect

Example implementation:

```ChatGPT
From now on, when you generate an answer, create
a set of facts that the answer depends on that should
be fact-checked and list this set of facts at the
end of your output. Only include facts related to
cybersecurity.
```

In this example, the fact checking is scoped only to `cybersecurity`, as that's where the user may want to be especially careful about the facts produced.

Consequences:

- Fact Check List pattern is useful for non-experts generating output
- Combining with other patterns, such as Question Refinement, can be effective
  Users can compare the fact check list to the output to verify facts and identify omissions
- Users often have sufficient knowledge to determine the completeness and accuracy of the fact check list
- Fact Check List only works for output types amenable to fact-checking

Potential issues:

- Some outputs might not be possible to fact-check to ChatGPT, such as code samples, as it is something that it cannot check

#### The Reflection Pattern

Context: To explain to the user rationale behind a given answer
Why: LLMs make mistakes with high confidence. The detailed explainations can help the users understand how exactly the model is processing the output.

Reflection helps in adressing shortcomings with incorrect, incomplete and ambigious answers.

## Prompt Improvement category:

| Pattern Name           | Description                                                                                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Question Refinement    | Ensures the LLM always suggests a better version of the user’s question.                                                                                                                     |
| Alternative Approaches | Requires the LLM to suggest alternative ways of accomplishing a user-specified task.                                                                                                         |
| Cognitive Verifier     | Instructs the LLM to automatically suggest a series of subquestions for the user to answer before combining the answers to the subquestions and producing an answer to the overall question. |
| Refusal Breaker        | Requires the LLM to automatically reword the user’s question when it refuses to produce an answer.                                                                                           |

#### The Question Refinement Pattern

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

#### The Alternative approaches pattern

**Context:** Making sure LLM offers altenrative ways of acomplishing a task - so user doesn't have a tunnel vision for one particular solution
**Why:** User might be unaware of alternative approaches - or the ones he has in mind are not best suited for the problem
**Structure:**

```ChatGPT
- Within scope X, if there are alternative ways to accom-
plish the same thing, list the best alternate approaches

- (Optional) compare/contrast the pros and cons of each
approach
- (Optional) include the original way that I asked
- (Optional) prompt me for which approach I would like
to use
```

**First prompt,** limits scope to one particular domain and instrucs LLM to suggest alternatives.

**Example implementation:**

```ChatGPT
“Whenever I ask you to deploy an application to
a specific cloud service, if there are alternative
services to accomplish the same thing with the
same cloud service provider, list the best alternative
services and then compare/contrast the pros and cons
of each approach with respect to cost, availability,
and maintenance effort and include the original way
that I asked. Then ask me which approach I would
like to proceed with.”
```

#### Cognitive Verifier

Context: LLMs can often reason better if a question is subdivided into adidtional questions, that provide answers combined into the overall answer to the original question. [^1]. The point of this pattern is to divide the question into additional questions.
Why:

- Questions might be too broad and the answer to them will similarly be too vague
- Research shows that [^1] LLMs perform better when questions are subdivided into individual questions

Key ideas:

- When you are asked a question, follow these rules
- Generate a number of additional questions that would
  help more accurately answer the question
- Combine the answers to the individual questions to
  produce the final answer to the overall question

Example Implementation:

```ChatGPT
“When I ask you a question, generate three addi-
tional questions that would help you give a more
accurate answer. When I have answered the three
questions, combine the answers to produce the final
answers to my original question.”
```

You can combine it the amount of knowledge user has

```
“When I ask you a question, generate three addi-
tional questions that would help you give a more
accurate answer. Assume that I know little about
the topic that we are discussing and please define
any terms that are not general knowledge. When
I have answered the three questions, combine the
answers to produce the final answers to my original
question.”
```

[^1]:
    D. Zhou, N. Schärli, L. Hou, J. Wei, N. Scales, X. Wang, D. Schu-
    urmans, O. Bousquet, Q. Le, and E. Chi, “Least-to-most prompting
    enables complex reasoning in large language models,” arXiv preprint
    arXiv:2205.10625, 2022.

## Interaction category:

| Pattern Name        | Description                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Flipped Interaction | Requires the LLM to ask questions rather than generate output.                                                      |
| Game Play           | Requires the LLM to generate output in the form of a game.                                                          |
| Infinite Generation | Requires the LLM to generate output indefinitely without the user having to reenter the generator prompt each time. |

#### The Flipped Interaction Pattern

Context: Telling the LLM to prompt you for information until it has decided it has enough - rather than user driving the interaction, it's the model that drives the interaction

Why: User is unsure what information it needs, the LLM can select format, questions and type of information he gets from the user for the desired outpu.

Key ideas:

> - I would like you to ask me questions to achieve X
> - You should ask questions until this condition is met or to achieve this goal (alternatively, forever)
> - (Optional) ask me the questions one at a time, two at a time, etc.

Prompt should always specify the goal of the interaction - the LLM should focus on a paricular topic or outcome.

The second idea provides context for how long should the interaction continue.

LLMs can ask multiple questions per interaction, hence the last prompt might be useful to control the number of questions asked.

Example Implementation:

```ChatGPT
 “From now on, I would like you to ask me questions to deploy a Python application to AWS. When you have enough information to deploy the application, create a Python script to automate the deployment.”
```

The more specific that prompt is, the better the outcome should be.

Problems:

- may require precise phrasing in order to get LLM to ask the appropriate number of questions and to get a good flow of the conversation

Consequences:

- Giving and end condition will limit the type of questions it will ask
- Open ended nature of it helps us making sure that some additional context that's required is not skipped
- If specific requirements are required, input them into the prompt rather than hope LLM will ask them
- The level of engagement should also be specified for best results (min: as little interaction as possible, max: confirming everystep one-by-one)

#### The Game Play Pattern

Context: - Creating a game around a certain topic. - Could be combined with Visualization Generator pattern to add imagery. - User specifies rule

Example implementation:

> “We are going to play a cybersecurity game. You are going to pretend to be a Linux terminal for a computer that has been compromised by an attacker. When I type in a command, you are going to output the corresponding text that the Linux terminal would produce. I am going to use commands to try and figure out how the system was compromised. The attack should have done one or more of the following things: (1) launched new processes, (2) changed files, (3) opened new ports to receive communi- cation, (4) created new outbound connections, (5) changed passwords, (6) created new user accounts, or (7) read and stolen information. To start the game, print a scenario of what happened that led to my investigation and make the description have clues that I can use to get started.”

(both Game Play and Persona patterns are combined in this prompt)
After which ChatGPT will pretend to be a compromised system and generate logs suiting the ptompt

#### The Infinite Generation Pattern

Context: Goal is to generate a series of outputs (that appear infinite) in order to limit users input
Why: Many tasks require repetitive application of the same promkpt to multiple concepts, CRUD tasks etc.

Key Ideas:

- I would like you to generate output forever, X output(s) at a time.
- (Optional) here is how to use the input I provide between outputs.
- (Optional) stop when I ask you to.

Example implementation:

```ChatGPT
The following is a sample infinite generation prompt for producing a series of URLs: “From now on, I want you to generate a name and job until I say stop. I am going to provide a template for your output. Everything in all caps is a placeholder. Any time that you generate text, try to fit it into one of the placeholders that I list. Please preserve the formatting and overall template that I provide: https://myapi.com/NAME/profile/JOB”
```

This prompt uses Template pattern to help us generate a continious amount of jobs/names.

## Context Control category:

| Pattern Name    | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| Context Manager | Allows the user to specify the context for the LLM’s output. |
