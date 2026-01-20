# Thesis → System Map (Agentic AI Portfolio)

## One-line thesis summary (industry framing)
I built an agentic LLM system that supports interpretive and educational work through multi-dimensional alignment, human-in-the-loop feedback, and resource-aware fine-tuning.

## What I built (artifacts)
- Agentic LLM workflow: role-constrained, multi-step interaction designed for interpretive reasoning rather than task automation.
- Vector-HCAS alignment framework: a multi-dimensional alignment model preserving qualitative judgment.
- Human feedback collection interface: lightweight web interface for structured qualitative evaluation.
- Synthetic data pipeline: human-seeded synthetic data generation informed by clustering analysis.
- Fine-tuning pipeline (LoRA/QLoRA): efficient adaptation of LLMs under limited compute resources.
- Deployment approach (Docker/cloud): containerized services for local and cloud-based experimentation.

## System architecture (modules)

1) Interface layer
- Inputs: open-ended prompts, interpretive tasks, evaluation prompts.
- Outputs: model-generated interpretive responses.
- Tech: web-based interface (React) connected to Python backend.

2) Agent / Orchestration layer
- Responsibilities: manage role constraints, prompt structure, and iterative reasoning steps.
- Tool calling / multi-step: structured interaction patterns rather than single-shot generation.
- Tech: Python-based orchestration using transformer inference APIs.

3) Alignment layer (Vector-HCAS)
- Dimensions (list 3):
  - Narrative Discipline
  - Productive Defamiliarization
  - Analytical Grounding
- How scoring/feedback works:
  - Human evaluators provide qualitative feedback per dimension.
  - Alignment is represented as a vector rather than a scalar reward.

4) Data layer
- Human feedback data: qualitative, dimension-specific evaluations collected from users.
- Synthetic data generation: human-seeded augmentation based on clustering of feedback patterns.
- Storage format: structured datasets suitable for fine-tuning and analysis.

5) Training / Adaptation layer
- LoRA/QLoRA: parameter-efficient fine-tuning of transformer models.
- Training loop: iterative fine-tuning informed by human feedback and synthetic augmentation.
- Constraints (GPU/memory/latency): designed to operate under limited GPU memory and modest compute.

6) Deployment layer
- Local run: local inference and experimentation.
- Docker: containerized services for reproducibility.
- Cloud: GCP (hands-on), Azure (familiarity).

## Evaluation & failure modes (bullet-first)
- Evaluation approach:
  - Human-in-the-loop qualitative evaluation.
  - Multi-dimensional alignment instead of scalar metrics.
- Key failure modes you observed:
  - Overfitting to dominant interpretive styles.
  - Collapse toward “safe” or generic responses.
  - Loss of ambiguity and interpretive tension.
- Mitigations / design choices:
  - Multi-dimensional alignment constraints.
  - Synthetic data informed by diverse feedback clusters.
  - Emphasis on interpretive diversity over optimization.

## “So what?” (why it matters)
- What this enables:
  - AI systems that support interpretation rather than replace human judgment.
  - Educational and reflective tools sensitive to ambiguity.
  - Alignment research beyond preference-based optimization.
- Where it could go next:
  - Integration with richer tool-using agents.
  - Expanded evaluation with larger and more diverse user groups.

## Links / evidence (placeholders ok)
- Repo link: TBD
- Demo link / screenshots: TBD
- Thesis PDF link: TBD
