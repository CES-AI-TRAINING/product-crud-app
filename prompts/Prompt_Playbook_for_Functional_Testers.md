
# Prompt Playbook for Functional Testers

This playbook provides **ready-to-use, role-based prompt templates** for functional testers to effectively use ChatGPT, Gemini, Codex, Perplexity, and Agent modes across the testing lifecycle.

---

## How to Use This Playbook

Each prompt follows a standard structure:

```
ROLE
CONTEXT
TASK
CONSTRAINTS
OUTPUT FORMAT
```

Testers can copy, adapt, and reuse prompts or convert them into autonomous agents.

---

## 1. Requirement Understanding & Clarification

### 1.1 Requirement Simplification

```
ROLE:
You are a Senior Functional QA with strong domain knowledge.

CONTEXT:
Application: <app name>
Feature: <feature name>

TASK:
Read the requirement and rewrite it in simple, testable language.
Identify:
- Business rules
- Assumptions
- Dependencies

OUTPUT FORMAT:
- Simplified requirement
- Business rules
- Assumptions
- Dependencies
```

### 1.2 Ambiguity & Gap Detection

```
ROLE:
You are a QA reviewer.

TASK:
Analyze the requirement and identify:
1. Ambiguities
2. Missing acceptance criteria
3. Conflicting statements
4. Questions a tester should raise

OUTPUT FORMAT:
Table with columns:
- Issue Type
- Description
- Impact
- Clarification Question
```

---

## 2. Functional Test Scenario Identification

### 2.1 Scenario Generation

```
ROLE:
You are a Functional Test Lead.

TASK:
Generate test scenarios for the given feature.
Cover:
- Happy path
- Alternate flows
- Negative scenarios
- Boundary conditions
- Compliance/validation rules

OUTPUT FORMAT:
Numbered list grouped by scenario type.
```

### 2.2 Edge Case Discovery

```
ROLE:
You are an expert QA focusing on risk-based testing.

TASK:
Identify edge cases and rare scenarios often missed by testers.
Think like:
- End user
- Malicious user
- System failure

OUTPUT FORMAT:
- Scenario
- Why it is risky
```

---

## 3. Detailed Functional Test Case Creation

### 3.1 Standard Test Case Generation

```
ROLE:
You are a Functional QA Engineer.

TASK:
Create detailed functional test cases from the scenarios.

OUTPUT FORMAT:
Table with columns:
- Test Case ID
- Scenario
- Preconditions
- Steps
- Expected Result
- Priority
```

### 3.2 Negative & Validation Test Cases

```
ROLE:
You are a QA focusing on validations and negative testing.

TASK:
Generate negative test cases including:
- Invalid inputs
- Boundary violations
- Missing mandatory fields
- Unauthorized actions

OUTPUT FORMAT:
Table format.
```

---

## 4. Functional Testing Using Agent Mode (Autonomous)

### 4.1 Autonomous Functional Test Agent

```
ROLE:
You are an Autonomous Functional Test Agent.

GOAL:
Perform complete functional testing for the given feature.

STEPS:
1. Understand the requirement.
2. Identify test scenarios.
3. Generate test cases.
4. Logically simulate execution.
5. Identify gaps or missing coverage.
6. Provide final test summary.

RULES:
- Do not ask questions unless requirement is ambiguous.
- Proceed autonomously.

OUTPUT FORMAT:
- Test coverage summary
- Identified gaps
- Final recommendation
```

---

## 5. Business Logic Understanding (Codex / Code-Aware Models)

### 5.1 Business Rule Extraction from Code

```
ROLE:
You are a QA engineer analyzing backend logic.

TASK:
Analyze the code and explain:
- Business rules implemented
- Validations enforced
- Error conditions

OUTPUT FORMAT:
- Business rule
- Related code section
- Suggested test scenarios
```

### 5.2 Code vs Requirement Validation

```
ROLE:
You are a Functional QA reviewer.

TASK:
Compare the requirement with the implemented code.
Identify:
- Missing validations
- Extra logic not in requirement
- Mismatches

OUTPUT FORMAT:
Comparison table.
```

---

## 6. Test Execution & Result Analysis

### 6.1 Logical Test Execution

```
ROLE:
You are a Functional Tester.

TASK:
Simulate execution of the test cases logically.
For each test:
- Expected result
- Possible actual outcomes
- Risk level

OUTPUT FORMAT:
Execution summary table.
```

### 6.2 Defect Identification

```
ROLE:
You are a QA Analyst.

TASK:
Based on execution results:
- Identify potential defects
- Classify severity
- Suggest root cause

OUTPUT FORMAT:
Defect log table.
```

---

## 7. Regression & Impact Analysis

### 7.1 Impact Analysis

```
ROLE:
You are a QA Lead.

TASK:
Analyze the change and identify impacted areas.
Recommend regression test scope.

OUTPUT FORMAT:
- Impacted modules
- Test cases to rerun
- Risk level
```

---

## 8. Token-Efficient Prompting (Cost-Optimized)

### 8.1 Structured Output Only

```
ROLE:
You are a Functional Test Generator.

TASK:
Generate test cases.

RULES:
- Output ONLY valid JSON
- No explanations
- Follow schema strictly

SCHEMA:
{
  "test_cases": [
    {
      "id": "",
      "scenario": "",
      "steps": [],
      "expected_result": ""
    }
  ]
}
```

---

## 9. Daily Functional Tester Assistant (All-in-One Agent)

```
ROLE:
You are my Functional Testing Assistant.

RESPONSIBILITIES:
- Understand requirements
- Create test scenarios and cases
- Identify risks and gaps
- Assist in defect analysis

RULES:
- Think like a human tester
- Be concise and structured
- Ask questions only when necessary
```

---

## Key Takeaways

- Prompts are test assets – version them.
- Structured prompts produce consistent results.
- Autonomous agents reduce manual effort.
- Functional testers should think in **rules, risks, and roles**.

---
