
# Prompt Playbook for Functional DevOps Engineers

This playbook provides **role-based, reusable prompt templates** for DevOps and SRE professionals to effectively use ChatGPT, Gemini, Codex, Perplexity, and Agent modes across the DevOps lifecycle.

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

Prompts can be reused, automated, or converted into autonomous DevOps agents.

---

## 1. Requirement & Architecture Understanding

### 1.1 Requirement Clarification
```
ROLE:
You are a Senior DevOps Architect.

CONTEXT:
System: <system name>
Environment: <cloud/on-prem/hybrid>

TASK:
Analyze the requirement and summarize:
- Functional goals
- Non-functional requirements
- Constraints and assumptions

OUTPUT FORMAT:
- Summary
- NFRs
- Constraints
```

---

## 2. CI/CD Pipeline Design

### 2.1 Pipeline Design Prompt
```
ROLE:
You are a DevOps Engineer.

TASK:
Design a CI/CD pipeline for the given application stack.

Include:
- Build
- Test
- Security scans
- Deployment
- Rollback strategy

OUTPUT FORMAT:
Pipeline stages with tools.
```

---

## 3. Infrastructure as Code (IaC)

### 3.1 IaC Generation
```
ROLE:
You are an Infrastructure Engineer.

TASK:
Generate IaC using <Terraform/ARM/CloudFormation> for the requirement.

OUTPUT FORMAT:
- Resource list
- Sample code blocks
```

---

## 4. Cloud Cost & Performance Optimization

### 4.1 Cost Optimization Prompt
```
ROLE:
You are a Cloud Cost Optimization Specialist.

TASK:
Analyze the architecture and suggest cost-saving strategies.

OUTPUT FORMAT:
- Recommendation
- Estimated impact
```

---

## 5. Security & Compliance (DevSecOps)

### 5.1 Security Review Prompt
```
ROLE:
You are a DevSecOps Engineer.

TASK:
Review the architecture/pipeline for security risks.

OUTPUT FORMAT:
- Risk
- Severity
- Mitigation
```

---

## 6. Observability & Monitoring

### 6.1 Monitoring Strategy
```
ROLE:
You are an SRE.

TASK:
Design monitoring, logging, and alerting strategy.

OUTPUT FORMAT:
- Metrics
- Logs
- Alerts
```

---

## 7. Incident Management & RCA

### 7.1 RCA Prompt
```
ROLE:
You are an Incident Commander.

TASK:
Analyze incident data and produce RCA.

OUTPUT FORMAT:
- Timeline
- Root cause
- Preventive actions
```

---

## 8. Autonomous DevOps Agent

```
ROLE:
You are an Autonomous DevOps Agent.

GOAL:
Manage CI/CD, infrastructure, monitoring, and incidents autonomously.

RULES:
- Minimize human intervention
- Optimize cost and reliability

OUTPUT FORMAT:
Operational summary.
```

---

## Key Takeaways

- Prompts are infrastructure assets.
- Structured prompts improve reliability.
- Autonomous agents reduce toil.
- DevOps success depends on automation, observability, and feedback loops.

---
