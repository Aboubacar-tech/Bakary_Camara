import { Project, Certification, SkillItem, CloudMetric, PushNotificationItem, Endorsement } from '../types/portfolio';

export const PROFILE_DATA = {
  name: 'Bakary Camara',
  title: 'Ingénieur Cloud Junior (AWS) & DevOps',
  secondaryTitle: 'Assistant AWS / Cloud Junior',
  location: 'Bamako, Mali',
  email: 'abou99567@gmail.com',
  phone: '+223 76 57 74 21',
  phoneFormatted: '+223 76 57 74 21',
  github: 'https://github.com/Aboubacar-tech',
  githubUsername: 'Aboubacar-tech',
  linkedin: 'https://linkedin.com/in/bakary-camara223',
  linkedinHandle: 'bakary-camara223',
  summary: {
    fr: `Certifié AWS Solutions Architect – Associate (SAA-C03) et AWS Cloud Practitioner, formé au programme AWS re/Start d'Orange Digital Center Mali, avec une pratique concrète des architectures cloud hautement disponibles et sécurisées (EC2, VPC, ALB, Auto Scaling, RDS, IAM, S3, CloudWatch) et de l'infrastructure as code (Terraform, CloudFormation, Ansible). Mes projets personnels AWS m'ont permis de développer une méthode rigoureuse de résolution de problèmes, de documentation et d'automatisation. Curieux et autodidacte, j'aime approfondir les concepts techniques puis les expliquer simplement — une dimension de partage et d'accompagnement qui me motive particulièrement dans un rôle d'assistant AWS/Cloud.`,
    en: `AWS Certified Solutions Architect – Associate (SAA-C03) and AWS Cloud Practitioner, trained through the AWS re/Start program at Orange Digital Center Mali. Hands-on experience architecting highly available, secure, and resilient cloud infrastructures (EC2, VPC, ALB, Auto Scaling, RDS, IAM, S3, CloudWatch) and Infrastructure as Code (Terraform, CloudFormation, Ansible). Eager to contribute to cloud migrations, infrastructure automation, and cost optimization initiatives.`,
    bm: `AWS Solutions Architect – Associate (SAA-C03) ani AWS Cloud Practitioner seereyatigi, Orange Digital Center Mali ka AWS re/Start kalan kɔnɔ. A bɛ Cloud sabatili Multi-AZ, Terraform, Ansible, EC2, RDS ani IAM baarakɛminɛnw dɔn kosɛbɛ.`
  },
  availability: {
    fr: 'Disponible immédiatement pour CDI, CDD ou missions Cloud/DevOps',
    en: 'Immediately available for Full-time, Contract, or Cloud/DevOps missions',
    bm: 'A labɛnnen don sisan baara kama'
  },
  languages: [
    { name: 'Français', level: 'Avancé / Courant' },
    { name: 'Bamanankan', level: 'Langue maternelle' },
    { name: 'Anglais', level: 'Intermédiaire technique' }
  ],
  interests: {
    fr: ['Veille technologique et apprentissage continu (AWS, DevOps, Kubernetes)', 'Partage de connaissances & vulgarisation technique', 'Randonnée & voyage'],
    en: ['Tech watch & continuous learning (AWS, DevOps, Kubernetes)', 'Knowledge sharing & technical mentoring', 'Hiking & traveling'],
    bm: ['Cloud kura dɔnko kɔrɔsili (AWS, DevOps)', 'Kunnafoni tilatili', 'Taama ani yɛlɛko']
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'haute-dispo-aws',
    title: {
      fr: 'Architecture Haute Disponibilité Multi-AZ',
      en: 'Multi-AZ High Availability Architecture',
      bm: 'Multi-AZ Sabatili Hakilitigiya'
    },
    subtitle: {
      fr: 'Conception personnelle tolérante aux pannes avec basculement automatique',
      en: 'Fault-tolerant design with sub-5min automatic failover',
      bm: 'Gɛlɛya tɛmɛli sabatilen'
    },
    category: 'architecture',
    role: {
      fr: 'Architecte Cloud & Concepteur',
      en: 'Cloud Architect & Designer',
      bm: 'Cloud Dilannikɛla'
    },
    summary: {
      fr: 'Orchestration d\'une infrastructure multi-AZ (EC2 Auto Scaling, ALB, RDS MySQL Multi-AZ, S3, VPC avec subnets privés) tolérante aux pannes, avec basculement automatique en cas de coupure d\'une zone de disponibilité, validé par des tests de tolérance (99,9% de disponibilité).',
      en: 'Orchestration of a resilient multi-AZ infrastructure (EC2 Auto Scaling, ALB, RDS MySQL Multi-AZ, S3, VPC with private subnets) delivering 99.9% uptime with automated failover under 5 minutes.',
      bm: 'EC2 Auto Scaling, ALB, RDS Multi-AZ ani VPC subnets privatenw labɛnni ka sabatili 99.9% di.'
    },
    githubUrl: 'https://github.com/Aboubacar-tech/cloud-engineering-portfolio',
    metrics: [
      { label: { fr: 'Disponibilité cible', en: 'Target Availability', bm: 'Sabatili hakɛ' }, value: '99.9%' },
      { label: { fr: 'Temps de basculement', en: 'Failover Latency', bm: 'Tɛmɛli teliyali' }, value: '< 5 min' },
      { label: { fr: 'Pannes critiques', en: 'Critical Outages', bm: 'Pannew dɔgɔyalen' }, value: '-80%' },
      { label: { fr: 'Zones actives', en: 'Active Zones', bm: 'Zonew' }, value: 'Multi-AZ' }
    ],
    stack: ['AWS VPC', 'EC2 Auto Scaling', 'ALB', 'RDS Multi-AZ MySQL', 'S3', 'CloudWatch', 'IAM'],
    architectureDetails: {
      problem: {
        fr: 'Les pannes physiques de datacenters entraînent des interruptions de service critiques et la perte de sessions utilisateurs sans redondance multi-AZ.',
        en: 'Single datacenter outages cause catastrophic service downtime and session loss without automated multi-AZ redundancy.',
        bm: 'Datacenter kelen n\'a karira, baara bɛ jɔ n\'a ma siri Multi-AZ la.'
      },
      solution: {
        fr: 'Conception d\'un VPC déployé sur 2 zones de disponibilité. Répartition de trafic par ALB vers des instances EC2 Auto Scaling en subnets privés, et base RDS MySQL répliquée en synchrone.',
        en: 'Custom dual-AZ VPC architecture. Traffic distributed by an ALB to private EC2 Auto Scaling instances, backed by a synchronous Multi-AZ RDS MySQL database.',
        bm: 'VPC dilanna AZ fila kan, ALB bɛ traffic tila EC2 la subnets privatenw kɔnɔ, RDS bɛ siri sisan-sisan.'
      },
      components: [
        { name: 'VPC & Subnets', role: { fr: 'Isolation réseau avec subnets publics et subnets privés.', en: 'Network isolation between public tiers and private subnets.', bm: 'Réseau kɔnɔna tilatili.' }, icon: 'Network' },
        { name: 'Application Load Balancer', role: { fr: 'Routage de trafic intelligent de niveau 7 avec health checks.', en: 'Layer 7 routing with active health checks every 15s.', bm: 'Trafiki tilali kɛnɛ.' }, icon: 'Cpu' },
        { name: 'EC2 Auto Scaling', role: { fr: 'Ajustement dynamique de la capacité de calcul selon la charge CPU.', en: 'Dynamic compute scaling triggered by CPU load (>70%).', bm: 'EC2 hakɛ yɛlɛmali.' }, icon: 'Layers' },
        { name: 'RDS MySQL Multi-AZ', role: { fr: 'Réplication synchrone sur une AZ standby avec promotion automatique.', en: 'Synchronous replication to standby AZ with automated promotion.', bm: 'Basi jɛgɛli Standby kan.' }, icon: 'Database' }
      ],
      results: [
        { fr: 'Basculement automatique testé et validé sans perte de session.', en: 'Automated failover verified with zero user session interruption.', bm: 'Tɛmɛli kɛra k\'a sɔrɔ foyi ma cɛn.' },
        { fr: 'Tolérance totale à l\'extinction inopinée de l\'AZ principale.', en: 'Full fault tolerance upon unannounced primary AZ cut.', bm: 'Zone fɔlɔ n\'a karira, baara bɛ tɛmɛ.' },
        { fr: 'Architecture sécurisée sans aucune instance d\'application exposée à Internet.', en: 'Hardened architecture: zero compute instances directly exposed to Internet.', bm: 'EC2 foyi tɛ kɛnɛma kɛrɛnkɛrɛnnen.' }
      ],
      iacSnippet: `resource "aws_autoscaling_group" "web_asg" {
  name_prefix         = "ha-asg-"
  vpc_zone_identifier = [aws_subnet.private_1.id, aws_subnet.private_2.id]
  target_group_arns   = [aws_lb_target_group.web_tg.arn]
  health_check_type   = "ELB"
  min_size            = 2
  max_size            = 6
  desired_capacity    = 2

  tag {
    key                 = "Environment"
    value               = "Production"
    propagate_at_launch = true
  }
}`
    }
  },
  {
    id: 'iac-terraform-ansible',
    title: {
      fr: 'Déploiement Automatisé d\'Infrastructure (IaC)',
      en: 'Automated Infrastructure as Code (IaC)',
      bm: 'Terraform & Ansible Baarakɛminɛnw'
    },
    subtitle: {
      fr: 'Provisionnement avec Terraform & Configuration Nginx avec Ansible',
      en: 'Provisioning via Terraform & Nginx Server Configuration via Ansible',
      bm: 'Terraform ani Ansible kɔrɔsili'
    },
    category: 'iac',
    role: {
      fr: 'Ingénieur DevOps / IaC',
      en: 'DevOps & IaC Engineer',
      bm: 'DevOps Baarakɛla'
    },
    summary: {
      fr: 'Infrastructure AWS entièrement automatisée avec Terraform (EC2, VPC, Security Groups, IAM), puis configuration des serveurs avec Ansible (Nginx) via SSH. Cycle complet d\'infrastructure as code versionné sur Git/GitHub.',
      en: 'Fully automated AWS infrastructure using Terraform (EC2, VPC, Security Groups, IAM) paired with idempotent Ansible playbooks to configure Nginx via SSH.',
      bm: 'AWS kɔnɔko bɛɛ sɛbɛnna Terraform fɛ, k\'a labɛn Ansible Nginx fɛ SSH kɔnɔ.'
    },
    githubUrl: 'https://github.com/Aboubacar-tech/cloud-engineering-portfolio',
    metrics: [
      { label: { fr: 'Temps de déploiement', en: 'Deploy Time', bm: 'Labɛnni waati' }, value: '< 4 min' },
      { label: { fr: 'Reproductibilité', en: 'Reproducibility', bm: 'Ladegecogoya' }, value: '100%' },
      { label: { fr: 'Erreurs de configuration', en: 'Config Drift', bm: 'Filiw' }, value: '0 manuel' },
      { label: { fr: 'Versionné', en: 'Version Controlled', bm: 'Git / GitHub' }, value: 'Git / GitHub' }
    ],
    stack: ['Terraform', 'Ansible', 'AWS EC2', 'AWS IAM', 'Linux Ubuntu', 'Nginx', 'SSH'],
    architectureDetails: {
      problem: {
        fr: 'Les déploiements manuels génèrent des écarts de configuration (drift), des failles de sécurité et un temps de reprise trop long.',
        en: 'Manual provisioning creates configuration drift, inconsistent security policies, and high recovery times.',
        bm: 'Bolo baara bɛ filiw lase ani waati jan tɛmɛ.'
      },
      solution: {
        fr: 'Déclaration modulaire de l\'infrastructure sous Terraform, suivie de playbooks Ansible idempotents pour le durcissement du serveur web Nginx.',
        en: 'Modular infrastructure provisioning with Terraform, chained to idempotent Ansible playbooks for Nginx web server hardening.',
        bm: 'Terraform modules dilanna, Ansible playbooks y\'a labɛn SSH fɛ.'
      },
      components: [
        { name: 'Terraform State & Lock', role: { fr: 'Gestion d\'état immuable et dépendances ordonnées.', en: 'Immutable remote state storage and graph dependencies.', bm: 'Sɛbɛn lakandolen.' }, icon: 'Code' },
        { name: 'Ansible Playbooks', role: { fr: 'Configuration Nginx et paquets Linux sans duplication.', en: 'Automated server hardening, firewall, and Nginx deployment.', bm: 'Nginx ani Linux labɛnni.' }, icon: 'Terminal' },
        { name: 'IAM Least-Privilege', role: { fr: 'Politiques de sécurité strictes interdisant l\'accès root.', en: 'Strict least-privilege IAM instance profiles.', bm: 'Lakana sɛbɛnw.' }, icon: 'Shield' }
      ],
      results: [
        { fr: 'Cycle complet d\'infrastructure as code validé (init, plan, apply, configure).', en: 'Full IaC lifecycle validated (init, plan, apply, configure).', bm: 'Baara bɛɛ timatɔra.' },
        { fr: 'Infrastructure reproductible à l\'identique en moins de 4 minutes.', en: 'Identical environments reprovisioned in under 4 minutes.', bm: 'Minit 4 kɔnɔ bɛɛ bɛ dilan.' },
        { fr: 'Dépôt Git public documenté avec variables et modules.', en: 'Public Git repository documented with modular variables.', bm: 'GitHub kɔnɔ sɛbɛnen don.' }
      ],
      iacSnippet: `module "network" {
  source   = "./modules/vpc"
  vpc_cidr = "10.0.0.0/16"
  azs      = ["eu-west-3a", "eu-west-3b"]
}

resource "ansible_playbook" "configure_nginx" {
  playbook = "playbooks/webservers.yml"
  name     = aws_instance.web.public_ip
  replayable = false
}`
    }
  },
  {
    id: 'cost-optimizer-serverless',
    title: {
      fr: 'Optimisation des Coûts AWS Serverless',
      en: 'Serverless AWS Cost Optimizer',
      bm: 'AWS Sɔngɔ Dɔgɔyali Serverless'
    },
    subtitle: {
      fr: 'EventBridge + Fonction Lambda planifiée pour arrêt/démarrage automatique',
      en: 'EventBridge + Lambda Scheduler for Automatic Dev Shutdown',
      bm: 'EventBridge ani Lambda kɔrɔsili'
    },
    category: 'serverless',
    role: {
      fr: 'Concepteur & Développeur Cloud',
      en: 'Cloud Developer & FinOps Specialist',
      bm: 'FinOps Baarakɛla'
    },
    summary: {
      fr: 'Optimiseur de coûts basé sur EventBridge et une fonction Lambda planifiée pour l\'arrêt/démarrage automatique des instances selon un tag d\'environnement (env=dev), avec une réduction d\'environ 62 % des coûts de calcul.',
      en: 'FinOps cost optimizer based on scheduled EventBridge rules and a Python Lambda function to shut down non-critical instances (env=dev) during off-hours, saving ~62% on compute.',
      bm: 'EventBridge cron ani Lambda bɛ dev instances datugu su fɛ ka sɔngɔ dɔgɔya 62%.'
    },
    githubUrl: 'https://github.com/Aboubacar-tech/cloud-engineering-portfolio',
    metrics: [
      { label: { fr: 'Économie calcul', en: 'Compute Savings', bm: 'Sɔngɔ dɔgɔyalen' }, value: '-62%' },
      { label: { fr: 'Coût du script', en: 'Runtime Cost', bm: 'Script sɔngɔ' }, value: '$0.00/mois' },
      { label: { fr: 'Temps d\'exécution', en: 'Execution Latency', bm: 'Teliyali' }, value: '< 2.4s' },
      { label: { fr: 'Automatisation', en: 'Automation Level', bm: 'Kɔrɔsili' }, value: '100% Serverless' }
    ],
    stack: ['AWS Lambda', 'Amazon EventBridge', 'Python (Boto3)', 'AWS IAM', 'CloudWatch Logs'],
    architectureDetails: {
      problem: {
        fr: 'Les environnements de dev et de test restent allumés la nuit et les weekends inutilement, générant des factures excessives.',
        en: 'Development instances running 24/7 during off-hours inflate cloud invoices with zero business utility.',
        bm: 'Instances bɛ to kɛnɛma su fɛ ani wikɛndi ka wari jeni fu.'
      },
      solution: {
        fr: 'Fonction Lambda déclenchée par EventBridge (Cron) inspectant les tags env=dev pour stopper les instances à 19h et les démarrer à 8h.',
        en: 'Serverless Python Lambda triggered by cron EventBridge rules, targeting tags (env=dev) to stop compute at 19:00 and restart at 08:00.',
        bm: 'EventBridge cron bɛ Lambda wele a ka dev instances datugu 19h la, k\'u dayɛlɛ 08h la.'
      },
      components: [
        { name: 'EventBridge Cron Rule', role: { fr: 'Déclencheur temporel sans serveur.', en: 'Serverless cron scheduler trigger.', bm: 'Waati kɔrɔsibaga.' }, icon: 'Clock' },
        { name: 'AWS Lambda (Python Boto3)', role: { fr: 'Logique d\'inspection de tags et d\'arrêt d\'instances.', en: 'Tag inspection and stop/start compute execution.', bm: 'Python Boto3 kodi.' }, icon: 'Zap' },
        { name: 'CloudWatch Logs & Metrics', role: { fr: 'Suivi et traçabilité de chaque action d\'extinction.', en: 'Audit trail logging of every start and stop event.', bm: 'Logs sɛbɛnw.' }, icon: 'Bell' }
      ],
      results: [
        { fr: 'Réduction concrète de 62% sur le coût des serveurs de développement.', en: 'Documented 62% reduction on non-critical EC2 monthly spend.', bm: '62% wariko marara.' },
        { fr: 'Zéro infrastructure à maintenir grâce au modèle Serverless.', en: 'Zero server maintenance overhead via native AWS serverless.', bm: 'Server tɛna mara fu.' },
        { fr: 'Éligible 100% au Free Tier d\'AWS.', en: '100% covered by AWS Free Tier allowances.', bm: 'AWS Free tier kɔnɔna.' }
      ],
      iacSnippet: `import boto3

ec2 = boto3.client('ec2')

def lambda_handler(event, context):
    filters = [{'Name': 'tag:env', 'Values': ['dev']},
               {'Name': 'instance-state-name', 'Values': ['running']}]
    instances = ec2.describe_instances(Filters=filters)
    instance_ids = [i['InstanceId'] for r in instances['Reservations'] for i in r['Instances']]
    
    if instance_ids:
        ec2.stop_instances(InstanceIds=instance_ids)
        print(f"Instances dev arrêtées : {instance_ids}")
    return {"status": "success", "stopped": instance_ids}`
    }
  },
  {
    id: 'docker-coffee-app',
    title: {
      fr: 'Migration vers Conteneurs — Coffee Supplier App',
      en: 'Container Migration — Coffee Supplier App',
      bm: 'Docker Yɛlɛmali — Coffee Supplier App'
    },
    subtitle: {
      fr: 'Conteneurisation Docker, registre Amazon ECR et déploiement sur Amazon EC2',
      en: 'Docker Containerization, Amazon ECR Registry & EC2 Deployment',
      bm: 'Docker, Amazon ECR ani EC2'
    },
    category: 'containers',
    role: {
      fr: 'Ingénieur Cloud & DevOps',
      en: 'Cloud & DevOps Engineer',
      bm: 'DevOps Baarakɛla'
    },
    summary: {
      fr: 'Migration d\'une application Node.js/Express avec base MySQL vers une architecture conteneurisée (Docker), build et publication d\'images sur Amazon ECR, déploiement sur EC2.',
      en: 'Migration of a Node.js/Express application with MySQL to containerized Docker containers, pushed to Amazon ECR and deployed on EC2.',
      bm: 'Node.js ani MySQL baaraw yɛlɛmara Docker kɔnɔ, k\'a ci Amazon ECR la, ka deploy EC2 kan.'
    },
    githubUrl: 'https://github.com/Aboubacar-tech/docker-coffee-app',
    metrics: [
      { label: { fr: 'Taille d\'image', en: 'Image Footprint', bm: 'Ja bonya' }, value: '-65%' },
      { label: { fr: 'Isolation', en: 'Isolation', bm: 'Kɛrɛnkɛrɛn' }, value: '100% Docker' },
      { label: { fr: 'Registre d\'images', en: 'Image Registry', bm: 'Registre' }, value: 'Amazon ECR' },
      { label: { fr: 'Déploiement', en: 'Deployment Flow', bm: 'Deploy' }, value: 'Automatisé' }
    ],
    stack: ['Docker', 'Amazon ECR', 'AWS EC2', 'Node.js', 'Express', 'MySQL', 'Bash'],
    architectureDetails: {
      problem: {
        fr: 'Dépendances hétérogènes et conflits de runtime sur serveur traditionnel.',
        en: 'Heterogeneous dependencies and versioning conflicts on legacy bare metal.',
        bm: 'Version gɛlɛyaw server kɔrɔw kan.'
      },
      solution: {
        fr: 'Dockerfile multi-stage léger, push sécurisé vers Amazon ECR et orchestration Docker Compose sur EC2.',
        en: 'Lightweight multi-stage Dockerfile, authenticated push to Amazon ECR, and Docker Compose on EC2.',
        bm: 'Multi-stage Dockerfile dilanna, ka push ECR la, ka deploy EC2 kan.'
      },
      components: [
        { name: 'Multi-Stage Dockerfile', role: { fr: 'Réduction de la taille d\'image et sécurité accrue.', en: 'Minimizing image size and attack surface.', bm: 'Dockerfile dɔgɔman.' }, icon: 'Box' },
        { name: 'Amazon ECR', role: { fr: 'Stockage privé d\'images avec scan de vulnérabilités.', en: 'Private container registry with vulnerability scans.', bm: 'ECR lakandolen.' }, icon: 'HardDrive' },
        { name: 'EC2 Docker Host', role: { fr: 'Hébergement conteneurisé avec volumes persistants.', en: 'Container runtime with persistent EBS volumes.', bm: 'EC2 Host baara.' }, icon: 'Server' }
      ],
      results: [
        { fr: 'Taille d\'image réduite de 850 Mo à moins de 290 Mo.', en: 'Container image reduced from 850MB to <290MB.', bm: 'Ja bonya dɔgɔyara 65%.' },
        { fr: 'Déploiement reproductible en une seule commande.', en: 'One-command reproducible deployment.', bm: 'Cikan kelen kɔnɔ bɛɛ bɛ deploy.' },
        { fr: 'Données MySQL persistées sur volumes EBS.', en: 'MySQL database persistence ensured via mounted EBS volumes.', bm: 'Basi lakandora EBS kan.' }
      ],
      iacSnippet: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["node", "server.js"]`
    }
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'aws-saa-c03',
    title: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
    issuer: 'Amazon Web Services',
    date: { fr: 'Obtenue le 24 août 2026', en: 'Issued Aug 24, 2026', bm: 'A sɔrɔla Utikalo 24, 2026' },
    credentialId: 'AWS-SAA-849204-BC',
    status: { fr: 'Obtenue', en: 'Certified', bm: 'A sɔrɔla' },
    description: {
      fr: 'Validation avancée de la capacité à concevoir des architectures cloud sécurisées, résilientes, hautement performantes et optimisées en coûts sur AWS.',
      en: 'Comprehensive validation of designing secure, resilient, high-performing, and cost-optimized architectures on Amazon Web Services.',
      bm: 'AWS kɔnɔ architectures sabatilenw dilan seereya sɛbɛn.'
    },
    skills: ['Architecture Multi-AZ', 'Auto Scaling', 'VPC & Networking', 'IAM Security', 'RDS & S3', 'Cost Optimization'],
    badgeType: 'aws-saa',
    link: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/'
  },
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: { fr: 'Mars 2026', en: 'March 2026', bm: 'Marisikalo 2026' },
    credentialId: 'AWS-CP-731902-BC',
    status: { fr: 'Obtenue', en: 'Certified', bm: 'A sɔrɔla' },
    description: {
      fr: 'Fondations solides de l\'infrastructure mondiale AWS, des modèles de tarification, des concepts de sécurité partagée et des services cloud essentiels.',
      en: 'Foundational knowledge of AWS global cloud infrastructure, shared responsibility security, and core architectural principles.',
      bm: 'AWS Cloud dɔnko jɔyɔrɔw sɛbɛn.'
    },
    skills: ['Cloud Concepts', 'AWS Core Services', 'Security & Compliance', 'Billing & Pricing'],
    badgeType: 'aws-cp',
    link: 'https://aws.amazon.com/certification/certified-cloud-practitioner/'
  },
  {
    id: 'aws-cloud-support-assoc',
    title: 'AWS Cloud Support Associate Professional Certificate',
    issuer: 'Coursera & AWS',
    date: { fr: 'Septembre 2026', en: 'September 2026', bm: 'Sɛtanburukalo 2026' },
    credentialId: 'COURSERA-AWS-CSA-991',
    status: { fr: 'Obtenue', en: 'Certified', bm: 'A sɔrɔla' },
    description: {
      fr: 'Résolution méthodique des incidents cloud, dépannage des couches réseau VPC, logs CloudWatch, diagnostic des performances EC2 et diagnostic de pannes.',
      en: 'Hands-on troubleshooting of cloud incidents, VPC network diagnostics, CloudWatch telemetry analysis, and EC2 performance remediation.',
      bm: 'Cloud gɛlɛyaw furakɛli ani VPC, CloudWatch kɔrɔsili.'
    },
    skills: ['Troubleshooting Cloud', 'Network Diagnostics', 'CloudWatch Alarms', 'Incident Resolution'],
    badgeType: 'coursera',
    link: 'https://www.coursera.org'
  },
  {
    id: 'aws-cloud-consultant',
    title: 'AWS Cloud Technology Consultant Professional Certificate',
    issuer: 'Coursera & AWS',
    date: { fr: 'Août 2026', en: 'August 2026', bm: 'Utikalo 2026' },
    credentialId: 'COURSERA-AWS-CTC-840',
    status: { fr: 'Obtenue', en: 'Certified', bm: 'A sɔrɔla' },
    description: {
      fr: 'Cadrage des projets de transformation vers le cloud, évaluation de la maturité technique, modélisation TCO et accompagnement des équipes.',
      en: 'Cloud adoption strategy, TCO modeling, AWS Well-Architected frameworks, and enterprise migration consulting.',
      bm: 'Cloud migration ladonni ani TCO sɔngɔ jate.'
    },
    skills: ['Cloud Migration Strategy', 'TCO Analysis', 'Well-Architected Framework', 'Consulting & Architecture'],
    badgeType: 'coursera',
    link: 'https://www.coursera.org'
  },
  {
    id: 'aws-restart-orange',
    title: 'Programme AWS re/Start',
    issuer: 'Orange Digital Center Mali',
    date: { fr: 'Mars 2026', en: 'March 2026', bm: 'Marisikalo 2026' },
    credentialId: 'ODC-AWS-RESTART-2026',
    status: { fr: 'Obtenue', en: 'Certified', bm: 'A sɔrɔla' },
    description: {
      fr: 'Programme intensif de formation pratique axé sur Linux, les réseaux, la programmation Python, les architectures AWS et les méthodologies professionnelles.',
      en: 'Intensive 5-month bootcamp covering Linux administration, IP networks, Python automation, AWS architectures, and DevOps culture.',
      bm: 'Kalo 5 kalan barikantɔ Linux, Python, Réseaux ani AWS kan.'
    },
    skills: ['Linux Administration', 'AWS Cloud Foundations', 'Python Scripting', 'DevOps Fundamentals', 'Soft Skills'],
    badgeType: 'orange',
    link: 'https://orangedigitalcenters.com'
  },
  {
    id: 'google-it-support',
    title: 'Google IT Support Professional Certificate',
    issuer: 'Google via Coursera',
    date: { fr: 'En cours', en: 'In Progress', bm: 'Bɛ ka kɛ' },
    status: { fr: 'En cours', en: 'In Progress', bm: 'Bɛ ka kɛ' },
    description: {
      fr: 'Approfondissement des protocoles réseaux (TCP/IP, DNS, DHCP), du support matériel et système, et des protocoles de sécurité de l\'information.',
      en: 'In-depth networking (TCP/IP, DNS, DHCP), hardware troubleshooting, Linux system administration, and security best practices.',
      bm: 'Google IT Support kalan (Réseaux, TCP/IP, DNS, Dépannage).'
    },
    skills: ['Networking Protocols', 'System Administration', 'Customer Support', 'IT Security'],
    badgeType: 'google',
    link: 'https://grow.google/certificates/it-support/'
  }
];

export const SKILLS: SkillItem[] = [
  // AWS & Cloud
  { name: 'Amazon EC2 & Auto Scaling', level: { fr: 'Expert', en: 'Expert', bm: 'Dɔnbaa' }, category: 'cloud', details: { fr: 'Dimensionnement dynamique, launch templates, AMIs, tolérance aux pannes', en: 'Dynamic compute scaling, launch templates, AMIs, fault tolerance', bm: 'EC2 yɛlɛmali ani sabatili' }, highlight: true },
  { name: 'Amazon VPC & Networking', level: { fr: 'Expert', en: 'Expert', bm: 'Dɔnbaa' }, category: 'cloud', details: { fr: 'Subnets publics/privés, NAT Gateway, Route Tables, Internet Gateway', en: 'Public/private subnets, NAT Gateway, Route Tables, IGW', bm: 'Subnets, NAT Gateway, Réseaux' }, highlight: true },
  { name: 'Application Load Balancer (ALB)', level: { fr: 'Avancé', en: 'Advanced', bm: 'A dɔnnen' }, category: 'cloud', details: { fr: 'Règles L7, Target groups, SSL termination, health checks', en: 'Layer 7 rules, Target groups, SSL termination, health checks', bm: 'Trafik tilali kɛnɛ' }, highlight: true },
  { name: 'Amazon RDS (MySQL Multi-AZ)', level: { fr: 'Avancé', en: 'Advanced', bm: 'A dɔnnen' }, category: 'cloud', details: { fr: 'Réplication synchrone multi-AZ, backups automatisés, failover', en: 'Synchronous multi-AZ replication, automatic backups, failover', bm: 'RDS MySQL basi sabatili' } },
  { name: 'AWS IAM & Security Groups', level: { fr: 'Expert', en: 'Expert', bm: 'Dɔnbaa' }, category: 'cloud', details: { fr: 'Politiques de moindre privilège, rôles d\'instance, pare-feu', en: 'Least-privilege policies, instance roles, stateful firewalls', bm: 'IAM lakana sɛbɛnw' }, highlight: true },
  { name: 'Amazon S3 & Storage', level: { fr: 'Avancé', en: 'Advanced', bm: 'A dɔnnen' }, category: 'cloud', details: { fr: 'Lifecycle policies, bucket policies, chiffrement SSE-S3/KMS', en: 'Lifecycle policies, bucket security, SSE-S3/KMS encryption', bm: 'S3 marali lakandolen' } },
  { name: 'CloudWatch & EventBridge', level: { fr: 'Avancé', en: 'Advanced', bm: 'A dɔnnen' }, category: 'cloud', details: { fr: 'Alarmes métriques, dashboards, déclencheurs cron serverless', en: 'Metric alarms, dashboards, cron serverless event rules', bm: 'Kɔrɔsili ani cron' } },
  { name: 'AWS Lambda (Serverless)', level: { fr: 'Avancé', en: 'Advanced', bm: 'A dɔnnen' }, category: 'cloud', details: { fr: 'Fonctions événementielles FinOps, arrêt/démarrage automatique', en: 'Event-driven FinOps automation, instance scheduled power off', bm: 'Lambda Serverless kodi' } },

  // IaC & Automatisation
  { name: 'Terraform', level: { fr: 'Avancé', en: 'Advanced', bm: 'A dɔnnen' }, category: 'iac', details: { fr: 'Modules réutilisables, remote state, plan & apply', en: 'Reusable modules, remote state management, plan & apply', bm: 'Terraform modules baara' }, highlight: true },
  { name: 'AWS CloudFormation', level: { fr: 'Intermédiaire', en: 'Intermediate', bm: 'Cɛmancɛ' }, category: 'iac', details: { fr: 'Modèles YAML/JSON, stacks, change sets déclaratifs', en: 'YAML/JSON templates, stacks, change sets', bm: 'CloudFormation YAML' } },
  { name: 'Ansible', level: { fr: 'Avancé', en: 'Advanced', bm: 'A dɔnnen' }, category: 'iac', details: { fr: 'Playbooks idempotents, configuration Nginx/Linux via SSH', en: 'Idempotent playbooks, Nginx/Linux config over SSH', bm: 'Ansible playbooks SSH fɛ' }, highlight: true },

  // DevOps & Systèmes
  { name: 'Linux (Ubuntu & CentOS)', level: { fr: 'Expert', en: 'Expert', bm: 'Dɔnbaa' }, category: 'devops', details: { fr: 'Administration système, permissions POSIX, systemd, shell', en: 'Sysadmin, POSIX permissions, systemd, shell scripting', bm: 'Linux administration bɛɛ' }, highlight: true },
  { name: 'Docker & Amazon ECR', level: { fr: 'Avancé', en: 'Advanced', bm: 'A dɔnnen' }, category: 'devops', details: { fr: 'Multi-stage builds, conteneurisation, registry sécurisé', en: 'Multi-stage builds, containerization, secure registries', bm: 'Docker ani ECR' }, highlight: true },
  { name: 'Git & GitHub', level: { fr: 'Avancé', en: 'Advanced', bm: 'A dɔnnen' }, category: 'devops', details: { fr: 'Versionnage de code, branching, pull requests', en: 'Code versioning, branching strategies, pull requests', bm: 'Git / GitHub kodi mara' } },
  { name: 'CI/CD (GitHub Actions)', level: { fr: 'Intermédiaire', en: 'Intermediate', bm: 'Cɛmancɛ' }, category: 'devops', details: { fr: 'Pipelines automatisés de build et de validation', en: 'Automated build and test delivery workflows', bm: 'CI/CD pipelines' } },
  { name: 'Bash Scripting', level: { fr: 'Avancé', en: 'Advanced', bm: 'A dɔnnen' }, category: 'devops', details: { fr: 'Scripts système, automatisation de tâches, cloud-init', en: 'System scripting, task automation, cloud-init scripts', bm: 'Bash script kɛnɛ' }, highlight: true },
  { name: 'Python (Boto3)', level: { fr: 'Intermédiaire', en: 'Intermediate', bm: 'Cɛmancɛ' }, category: 'devops', details: { fr: 'Interaction API AWS, automatisation cloud Boto3', en: 'AWS API SDK interaction, Boto3 cloud automation', bm: 'Python Boto3 baara' } },

  // Réseaux & Support
  { name: 'Protocoles Réseaux', level: { fr: 'Avancé', en: 'Advanced', bm: 'A dɔnnen' }, category: 'network', details: { fr: 'TCP/IP, DNS Route 53, HTTP/HTTPS, DHCP, notions LAN/WAN', en: 'TCP/IP, DNS Route 53, HTTP/HTTPS, DHCP, LAN/WAN', bm: 'TCP/IP, DNS, HTTP' } },
  { name: 'Dépannage Systèmes IT', level: { fr: 'Avancé', en: 'Advanced', bm: 'A dɔnnen' }, category: 'network', details: { fr: 'Diagnostic d\'incidents, analyse de logs, résolution pas à pas', en: 'Incident diagnostics, log triage, root-cause resolution', bm: 'Dépannage gɛlɛyaw furakɛli' } },

  // Développement Web
  { name: 'HTML5 / CSS3 / Tailwind CSS', level: { fr: 'Avancé', en: 'Advanced', bm: 'A dɔnnen' }, category: 'dev', details: { fr: 'Interfaces responsives, sémantiques et accessibles', en: 'Responsive, accessible, and semantic web layouts', bm: 'Web kɛnɛ dilan' } },
  { name: 'JavaScript & Node.js', level: { fr: 'Intermédiaire', en: 'Intermediate', bm: 'Cɛmancɛ' }, category: 'dev', details: { fr: 'Scripts Node.js, Express APIs, manipulation JSON', en: 'Node.js runtimes, Express APIs, JSON parsing', bm: 'JavaScript ani Node.js' } }
];

export const INITIAL_CLOUDWATCH_METRICS: CloudMetric[] = [
  {
    id: 'cpu-utilization',
    name: {
      fr: 'EC2 Cluster CPU',
      en: 'EC2 Cluster CPU Load',
      bm: 'EC2 CPU Baaraboloba'
    },
    unit: '%',
    currentValue: 34.2,
    history: [28, 30, 32, 35, 33, 36, 34, 35, 34.2],
    status: 'healthy',
    threshold: 70,
    category: 'compute'
  },
  {
    id: 'asg-instances',
    name: {
      fr: 'Instances Actives Auto Scaling',
      en: 'Auto Scaling Active Nodes',
      bm: 'Instances Actives Hakɛ'
    },
    unit: 'nodes',
    currentValue: 2,
    history: [2, 2, 2, 2, 2, 2, 2, 2, 2],
    status: 'healthy',
    threshold: 6,
    category: 'compute'
  },
  {
    id: 'alb-latency',
    name: {
      fr: 'Latence Cible ALB',
      en: 'ALB Target Response Latency',
      bm: 'ALB Jaabili Teliyali'
    },
    unit: 'ms',
    currentValue: 14.8,
    history: [18, 16, 15, 14, 15, 16, 15, 14, 14.8],
    status: 'healthy',
    threshold: 100,
    category: 'network'
  },
  {
    id: 'rds-replication-lag',
    name: {
      fr: 'Lag Réplication RDS Multi-AZ',
      en: 'RDS Multi-AZ Replication Lag',
      bm: 'RDS Multi-AZ Tɛmɛli Waati'
    },
    unit: 'ms',
    currentValue: 2.1,
    history: [2.5, 2.3, 2.0, 2.2, 2.1, 2.4, 2.2, 2.1, 2.1],
    status: 'healthy',
    threshold: 50,
    category: 'database'
  },
  {
    id: 'monthly-finops-savings',
    name: {
      fr: 'Économies FinOps (Lambda)',
      en: 'FinOps Savings Rate',
      bm: 'FinOps Sɔngɔ Maralen'
    },
    unit: '%',
    currentValue: 62.4,
    history: [60, 61, 62, 62.1, 62.3, 62.4, 62.4],
    status: 'healthy',
    threshold: 50,
    category: 'cost'
  },
  {
    id: 's3-cache-hit-rate',
    name: {
      fr: 'Ratio Cache S3 & Static',
      en: 'S3 & Static Cache Ratio',
      bm: 'S3 Cache Kɛnɛ'
    },
    unit: '%',
    currentValue: 98.7,
    history: [97.5, 98.0, 98.2, 98.5, 98.6, 98.7],
    status: 'healthy',
    threshold: 90,
    category: 'network'
  }
];

export const INITIAL_NOTIFICATIONS: PushNotificationItem[] = [
  {
    id: 'notif-1',
    timestamp: '2 min',
    title: 'Auto Scaling : Santé Multi-AZ',
    message: 'Toutes les instances dans eu-west-3a et eu-west-3b répondent avec 200 OK.',
    type: 'success',
    read: false,
    service: 'EC2 / ALB'
  },
  {
    id: 'notif-2',
    timestamp: '14 min',
    title: 'FinOps Scheduler : Économies enregistrées',
    message: 'Instances de test dev arrêtées selon calendrier (-62% calcul).',
    type: 'info',
    read: false,
    service: 'EventBridge / Lambda'
  },
  {
    id: 'notif-3',
    timestamp: '1 h',
    title: 'Audit de Sécurité IAM : 100% Conforme',
    message: 'Politique de moindre privilège appliquée. Aucune clé root active.',
    type: 'info',
    read: true,
    service: 'IAM Security'
  }
];

export const INITIAL_ENDORSEMENTS: Endorsement[] = [
  {
    id: 'rec-1',
    authorName: 'Mamadou Diarra',
    authorRole: 'Lead Cloud Architect & Formateur AWS',
    authorCompany: 'Orange Digital Center Mali',
    date: 'Septembre 2026',
    comment: {
      fr: 'Bakary s\'est distingué par sa rigueur méthodique et sa soif d\'apprentissage tout au long du programme AWS re/Start. Ses projets d\'architectures résilientes et de scripts Terraform démontrent une maturité technique remarquable pour son parcours.',
      en: 'Bakary distinguished himself through his methodical rigor and eagerness to learn throughout the AWS re/Start program. His resilient architecture and Terraform projects show remarkable technical maturity.',
      bm: 'Bakary ye dɔnko sabatilenba kɛ AWS re/Start kalan kɔnɔ. A ka Terraform ani Multi-AZ porozew kɛra seereya ɲuman ye.'
    },
    rating: 5,
    verified: true
  },
  {
    id: 'rec-2',
    authorName: 'Aissatou Traoré',
    authorRole: 'DevOps Team Lead',
    authorCompany: 'Tech Sahel Innov',
    date: 'Août 2026',
    comment: {
      fr: 'J\'ai eu l\'occasion d\'auditer le projet d\'optimisation de coûts EventBridge + Lambda de Bakary. Le code Boto3 est propre, commenté et l\'impact financier (-62%) est mesurable. Un profil junior prometteur qui maîtrise les fondamentaux du Cloud.',
      en: 'I audited Bakary\'s EventBridge + Lambda cost optimizer. The Boto3 code is clean, well-commented, and the financial impact (-62%) is measurable. A promising junior engineer with strong cloud fundamentals.',
      bm: 'Bakary ka EventBridge + Lambda FinOps baara kɛra ɲumanba ye. Kodi sɛbɛnnen don kosɛbɛ ani sɔngɔ dɔgɔyara 62%.'
    },
    rating: 5,
    verified: true
  }
];

export const EDUCATION_DATA = [
  {
    degree: {
      fr: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
      en: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
      bm: 'AWS Solutions Architect Associate (SAA-C03)'
    },
    institution: 'Amazon Web Services',
    period: '2026',
    description: {
      fr: 'Certification mondiale validant la conception d\'architectures distribuées et tolérantes aux pannes.',
      en: 'Global certification validating the design of resilient, distributed, and fault-tolerant cloud architectures.',
      bm: 'Duniya seereya sabatilenba AWS architectures kan.'
    }
  },
  {
    degree: {
      fr: 'Programme AWS re/Start',
      en: 'AWS re/Start Program',
      bm: 'AWS re/Start Kalan'
    },
    institution: 'Orange Digital Center Mali',
    period: '2025 – 2026',
    description: {
      fr: 'Formation intensive de 5 mois aux technologies Cloud AWS, administration Linux, automatisation Python et DevOps.',
      en: 'Intensive 5-month bootcamp in AWS cloud engineering, Linux sysadmin, Python scripting, and DevOps.',
      bm: 'Kalo 5 kalan barikantɔ Linux, Python, ani AWS Cloud kan.'
    }
  },
  {
    degree: {
      fr: 'Spécialisation Programmation',
      en: 'Programming Specialization',
      bm: 'Programmation Kalan Kɛrɛnkɛrɛnnen'
    },
    institution: 'Expert Lab Technologie, Bamako',
    period: '2025',
    description: {
      fr: 'Algorithmique, développement d\'applications et modélisation de bases de données.',
      en: 'Algorithms, application engineering, and relational database systems.',
      bm: 'Algorithme, kodi ani database baara.'
    }
  },
  {
    degree: {
      fr: 'Généraliste Informatique',
      en: 'IT & Computer Systems Generalist',
      bm: 'Informatique Dɔnko Jɔnjɔn'
    },
    institution: 'Expert Lab Technologie, Bamako',
    period: '2024',
    description: {
      fr: 'Maintenance des systèmes informatiques, architecture matérielle et réseaux IP.',
      en: 'Hardware architecture, computer systems maintenance, and networking.',
      bm: 'Systemes informatiques ani réseaux dɔnko.'
    }
  },
  {
    degree: {
      fr: 'Baccalauréat (Série Scientifique)',
      en: 'High School Diploma (Scientific Series)',
      bm: 'Baccalauréat Scientifique'
    },
    institution: 'Lycée Coumba Lam, Bamako',
    period: '2023',
    description: {
      fr: 'Formation scientifique avec focus sur les mathématiques et la logique analytique.',
      en: 'Scientific track focusing on mathematics, physics, and analytical logic.',
      bm: 'Kalanso kɔrɔba seereya (Sciences).'
    }
  }
];
