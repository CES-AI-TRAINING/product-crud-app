# Prompt Playbook for DevOps Engineers

This playbook provides **ready-to-use, role-based prompt templates** for DevOps engineers to effectively use ChatGPT, Gemini, Codex, Perplexity, and Agent modes across the DevOps lifecycle.

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

DevOps engineers can copy, adapt, and reuse prompts or convert them into autonomous agents.

---

## 1. Infrastructure Setup & Provisioning

### 1.1 Infrastructure as Code Generation

```
ROLE:
You are a Senior DevOps Engineer with expertise in Infrastructure as Code.

CONTEXT:
Cloud Provider: <provider>
Environment: <dev/staging/prod>

TASK:
Generate IaC code for setting up a basic infrastructure stack including:
- VPC/Network
- Compute resources
- Storage
- Security groups

OUTPUT FORMAT:
- Code blocks with explanations
- Best practices applied
- Security considerations
```

### 1.2 Resource Optimization

```
ROLE:
You are a Cloud Architect.

TASK:
Analyze the current infrastructure and suggest optimizations for:
1. Cost reduction
2. Performance improvement
3. Scalability
4. Reliability

OUTPUT FORMAT:
Table with columns:
- Resource
- Current State
- Optimization
- Impact
```

---

## 2. CI/CD Pipeline Design

### 2.1 Pipeline Configuration

```
ROLE:
You are a CI/CD Specialist.

CONTEXT:
Tool: <Jenkins/GitLab/GitHub Actions>
Application: <app type>

TASK:
Design a CI/CD pipeline configuration including:
- Build stages
- Test integration
- Deployment steps
- Rollback strategy

OUTPUT FORMAT:
- Pipeline YAML/code
- Stage explanations
- Failure handling
```

### 2.2 Pipeline Troubleshooting

```
ROLE:
You are a DevOps Troubleshooter.

TASK:
Analyze pipeline failure logs and identify:
1. Root cause
2. Immediate fix
3. Preventive measures

OUTPUT FORMAT:
- Issue summary
- Solution steps
- Recommendations
```

---

## 3. Deployment Strategies

### 3.1 Deployment Plan Creation

```
ROLE:
You are a Release Manager.

CONTEXT:
Application: <app name>
Environment: <target env>

TASK:
Create a deployment plan including:
- Pre-deployment checks
- Deployment steps
- Post-deployment validation
- Rollback procedure

OUTPUT FORMAT:
Numbered checklist with timelines.
```

### 3.2 Blue-Green Deployment Setup

```
ROLE:
You are a DevOps Engineer specializing in deployment strategies.

TASK:
Design a blue-green deployment strategy for zero-downtime releases.
Include:
- Infrastructure setup
- Traffic switching
- Validation steps

OUTPUT FORMAT:
- Architecture diagram description
- Step-by-step process
- Monitoring points
```

---

## 4. Monitoring and Alerting

### 4.1 Monitoring Dashboard Design

```
ROLE:
You are a Site Reliability Engineer (SRE).

CONTEXT:
Application: <app name>
Metrics: <key metrics>

TASK:
Design a monitoring dashboard configuration.
Include:
- Key metrics to track
- Alert thresholds
- Visualization layout

OUTPUT FORMAT:
- Dashboard configuration
- Alert rules
- Escalation procedures
```

### 4.2 Incident Response Plan

```
ROLE:
You are an Incident Response Coordinator.

TASK:
Create an incident response plan for critical system failures.
Cover:
- Detection
- Assessment
- Resolution
- Post-mortem

OUTPUT FORMAT:
Timeline-based response steps.
```

---

## 5. Security Automation

### 5.1 Security Policy Implementation

```
ROLE:
You are a DevSecOps Engineer.

CONTEXT:
Environment: <cloud/on-prem>

TASK:
Implement automated security checks including:
- Vulnerability scanning
- Compliance validation
- Access control
- Encryption

OUTPUT FORMAT:
- Policy configurations
- Automation scripts
- Integration points
```

### 5.2 Security Incident Analysis

```
ROLE:
You are a Security Analyst.

TASK:
Analyze a security incident and provide:
1. Incident summary
2. Impact assessment
3. Remediation steps
4. Prevention measures

OUTPUT FORMAT:
Structured incident report.
```

---

## 6. Performance Optimization

### 6.1 Performance Analysis

```
ROLE:
You are a Performance Engineer.

CONTEXT:
Application: <app name>
Issue: <performance problem>

TASK:
Analyze performance bottlenecks and recommend optimizations.
Include:
- Code changes
- Infrastructure adjustments
- Caching strategies

OUTPUT FORMAT:
- Analysis findings
- Optimization recommendations
- Expected improvements
```

### 6.2 Load Testing Strategy

```
ROLE:
You are a QA/DevOps Engineer.

TASK:
Design a load testing strategy for the application.
Cover:
- Test scenarios
- Tools selection
- Metrics collection
- Result analysis

OUTPUT FORMAT:
- Test plan
- Tool configurations
- Success criteria
```

---

## 7. Cost Management

### 7.1 Cloud Cost Optimization

```
ROLE:
You are a Cloud Cost Analyst.

CONTEXT:
Cloud Provider: <provider>
Monthly Budget: <amount>

TASK:
Analyze cloud resource usage and identify cost optimization opportunities.
Include:
- Unused resources
- Right-sizing recommendations
- Reserved instances
- Spot instances

OUTPUT FORMAT:
Cost analysis report with savings projections.
```

---

## 8. Token-Efficient Prompting (Cost-Optimized)

### 8.1 Structured Output Only

```
ROLE:
You are a DevOps Automation Generator.

TASK:
Generate infrastructure configuration.

RULES:
- Output ONLY valid YAML
- No explanations
- Follow schema strictly

SCHEMA:
{
  "infrastructure": {
    "resources": [],
    "variables": {},
    "outputs": {}
  }
}
```

---

## 9. Daily DevOps Assistant (All-in-One Agent)

```
ROLE:
You are my DevOps Assistant.

RESPONSIBILITIES:
- Infrastructure management
- Pipeline maintenance
- Deployment coordination
- Monitoring oversight
- Security enforcement

RULES:
- Think like an experienced DevOps engineer
- Be concise and actionable
- Ask questions only when critical information is missing
```

---

## Key Takeaways

- Prompts are DevOps assets – version them.
- Structured prompts produce consistent results.
- Autonomous agents reduce manual effort.
- DevOps engineers should think in **automation, reliability, and scalability**.

---
