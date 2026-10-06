import { Language } from '../types/portfolio';

export interface UIContent {
  nav: {
    home: string;
    projects: string;
    cloudwatch: string;
    skills: string;
    certifications: string;
    testimonials: string;
    contact: string;
    discuss: string;
    themeLight: string;
    themeDark: string;
    notifications: string;
  };
  hero: {
    statusBadge: string;
    role: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    summary: string;
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
    btnProjects: string;
    btnCloudWatch: string;
    btnCV: string;
    awsRegionStatus: string;
    healthy: string;
    shadersActive: string;
    openCloudwatch: string;
  };
  projects: {
    tag: string;
    title: string;
    subtitle: string;
    all: string;
    filterHa: string;
    filterIac: string;
    filterFinops: string;
    filterDocker: string;
    viewDetails: string;
    modalSubtitle: string;
    problemTitle: string;
    solutionTitle: string;
    componentsTitle: string;
    resultsTitle: string;
    codeSnippetTitle: string;
    copyCode: string;
    copiedCode: string;
    githubLink: string;
    closeBtn: string;
    simulationTitle: string;
    simulationDesc: string;
    simulateFailoverBtn: string;
    zoneA: string;
    zoneB: string;
    normalStatus: string;
    outageStatus: string;
    failoverSuccess: string;
    finopsCalcTitle: string;
    finopsCalcDesc: string;
    finopsDevInstances: string;
    finopsSavingsLabel: string;
  };
  cloudwatch: {
    tag: string;
    title: string;
    subtitle: string;
    live: string;
    pause: string;
    surgeBtn: string;
    surgingBtn: string;
    configTitle: string;
    exportJson: string;
    syncLabel: string;
    envAll: string;
    envProd: string;
    envStaging: string;
    envDev: string;
    alertThreshold: string;
    refreshSpeed: string;
    recentHistory: string;
    slaNote: string;
  };
  skills: {
    tag: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    all: string;
    catCloud: string;
    catIac: string;
    catDevops: string;
    catNetwork: string;
    catDev: string;
    verifiedBadge: string;
    noResults: string;
  };
  certifications: {
    tag: string;
    title: string;
    subtitle: string;
    viewCert: string;
    officialPage: string;
    closeModal: string;
    academicTitle: string;
    academicTag: string;
  };
  testimonials: {
    tag: string;
    title: string;
    subtitle: string;
  };
  contact: {
    tag: string;
    title: string;
    subtitle: string;
    directTitle: string;
    emailLabel: string;
    phoneLabel: string;
    locLabel: string;
    mobility: string;
    whatsappBtn: string;
    cvBtn: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailInputLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendBtn: string;
    successTitle: string;
    successMsg: string;
    responseTime: string;
    copied: string;
  };
  resume: {
    title: string;
    formatTag: string;
    copyBtn: string;
    copiedBtn: string;
    printBtn: string;
    closeBtn: string;
    professionalSummary: string;
    certificationsTitle: string;
    projectsTitle: string;
    skillsTitle: string;
    educationTitle: string;
    languagesTitle: string;
    interestsTitle: string;
  };
  notifications: {
    title: string;
    subtitle: string;
    browserPush: string;
    enablePush: string;
    pushEnabled: string;
    eventsCount: string;
    simulateAlert: string;
    markAllRead: string;
    emptyTitle: string;
    emptyDesc: string;
    clearHistory: string;
    close: string;
  };
  footer: {
    rights: string;
    cvLink: string;
    top: string;
  };
}

export const TRANSLATIONS: Record<Language, UIContent> = {
  fr: {
    nav: {
      home: 'Accueil',
      projects: 'Projets Cloud',
      cloudwatch: 'Live CloudWatch',
      skills: 'Compétences',
      certifications: 'Certifications',
      testimonials: 'Témoignages',
      contact: 'Contact',
      discuss: 'Discuter',
      themeLight: 'Mode clair',
      themeDark: 'Mode sombre',
      notifications: 'Alertes'
    },
    hero: {
      statusBadge: 'Disponible immédiatement',
      role: 'Ingénieur Cloud Junior (AWS) & DevOps',
      titleLine1: 'Architectures Cloud',
      titleLine2: 'Hautement Disponibles',
      subtitle: 'Assistant AWS / Cloud Junior',
      summary: 'Certifié AWS Solutions Architect – Associate (SAA-C03). Spécialiste des architectures résilientes multi-AZ, de l\'automatisation Terraform & Ansible et de l\'optimisation FinOps serverless (-62% de coûts calcul).',
      stat1Label: 'Disponibilité Multi-AZ',
      stat2Label: 'Coûts calcul réduits',
      stat3Label: 'Failover automatique',
      btnProjects: 'Explorer les 4 projets',
      btnCloudWatch: 'Tableau de bord live',
      btnCV: 'Consulter le CV',
      awsRegionStatus: 'Région AWS : eu-west-3 (Paris)',
      healthy: '100% OPÉRATIONNEL',
      shadersActive: 'Rendu WebGL & Shaders actifs',
      openCloudwatch: 'Ouvrir la console'
    },
    projects: {
      tag: '01. Projets Cloud & Réalisations Personnelles',
      title: 'Infrastructures & Automatisation',
      subtitle: 'Architectures réelles conçues, testées et validées sur Amazon Web Services, de la résilience multi-AZ aux pipelines déclaratifs Terraform & Ansible.',
      all: 'Tous les projets (4)',
      filterHa: 'Haute Disponibilité',
      filterIac: 'Infrastructure as Code',
      filterFinops: 'Serverless FinOps',
      filterDocker: 'Docker & ECR',
      viewDetails: 'Examiner l\'architecture & code',
      modalSubtitle: 'Projet Personnel AWS',
      problemTitle: 'Problématique technique',
      solutionTitle: 'Solution architecturée',
      componentsTitle: 'Composants de l\'architecture',
      resultsTitle: 'Résultats concrets & métriques',
      codeSnippetTitle: 'Extrait de configuration / code',
      copyCode: 'Copier le code',
      copiedCode: 'Copié dans le presse-papier !',
      githubLink: 'Voir le dépôt sur GitHub',
      closeBtn: 'Fermer',
      simulationTitle: 'Simulateur de Tolérance aux Pannes Multi-AZ',
      simulationDesc: 'Testez la résilience du basculement automatique conçu par Bakary.',
      simulateFailoverBtn: 'Simuler Coupure AZ-a',
      zoneA: 'Zone eu-west-3a',
      zoneB: 'Zone eu-west-3b',
      normalStatus: 'OPÉRATIONNEL',
      outageStatus: 'PANNE SIMULÉE',
      failoverSuccess: 'Test validé : Trafic 100% redirigé par l\'ALB sans coupure de session. Temps de détection < 15s.',
      finopsCalcTitle: 'Calculateur d\'Économies FinOps',
      finopsCalcDesc: 'Ajustez le nombre d\'instances dev pour calculer l\'économie mensuelle générée par le script Lambda.',
      finopsDevInstances: 'Instances EC2 Dev taguées',
      finopsSavingsLabel: 'Économies estimées / mois (-62%)'
    },
    cloudwatch: {
      tag: '02. Surveillance d\'Infrastructure en Temps Réel',
      title: 'Tableau de Bord CloudWatch',
      subtitle: 'Console de télémétrie interactive simulant les métriques opérationnelles des architectures AWS de Bakary (calcul, latence ALB, réplication RDS et FinOps).',
      live: 'En direct',
      pause: 'En pause',
      surgeBtn: 'Simuler pic de charge',
      surgingBtn: 'Pic de charge en cours...',
      configTitle: 'Paramètres d\'alertes & seuils',
      exportJson: 'Exporter métriques JSON',
      syncLabel: 'Flux télémétrique temps réel',
      envAll: 'Tous les environnements',
      envProd: 'Production (Multi-AZ)',
      envStaging: 'Staging',
      envDev: 'Dev FinOps (-62%)',
      alertThreshold: 'Seuil d\'alerte CPU CloudWatch',
      refreshSpeed: 'Vitesse de rafraîchissement',
      recentHistory: 'Historique récent',
      slaNote: 'SLA Objectif de Résilience: 99.9% · Multi-AZ Failover: < 5 min'
    },
    skills: {
      tag: '03. Compétences & Savoir-faire Technique',
      title: 'Maîtrise AWS, IaC & DevOps',
      subtitle: 'Solides acquis forgés par la pratique sur le terrain, le programme AWS re/Start et la certification Solutions Architect Associate (SAA-C03).',
      searchPlaceholder: 'Filtrer une compétence (ex: Terraform, VPC)...',
      all: 'Toutes les compétences',
      catCloud: 'AWS & Cloud',
      catIac: 'IaC & Automatisation',
      catDevops: 'DevOps & Linux',
      catNetwork: 'Réseaux & Support',
      catDev: 'Web & Scripting',
      verifiedBadge: 'Pratiqué en projet AWS réel',
      noResults: 'Aucune compétence trouvée.'
    },
    certifications: {
      tag: '04. Certifications Industrielles & Formations',
      title: 'Accréditations Officielles AWS',
      subtitle: 'Parcours certifié par Amazon Web Services, Coursera et Orange Digital Center, attestant de compétences techniques vérifiables.',
      viewCert: 'Détails & Vérification',
      officialPage: 'Page officielle de certification',
      closeModal: 'Fermer',
      academicTitle: 'Formation Supérieure & Fondations',
      academicTag: 'Parcours Académique & Diplômes'
    },
    testimonials: {
      tag: '05. Témoignages & Avis Vérifiés',
      title: 'Recommandations & Retours Techniques',
      subtitle: 'Avis de mentors certifiés AWS, formateurs et pairs ayant collaboré avec Bakary sur ses projets d\'infrastructure.'
    },
    contact: {
      tag: '06. Prise de Contact & Opportunités',
      title: 'Collaborons sur vos Projets Cloud',
      subtitle: 'À la recherche d’une opportunité en tant qu’Ingénieur Cloud Junior (AWS), Assistant Cloud ou DevOps. Disponible immédiatement.',
      directTitle: 'Coordonnées Directes',
      emailLabel: 'Email professionnel',
      phoneLabel: 'Téléphone / WhatsApp',
      locLabel: 'Localisation',
      mobility: 'Mobilité internationale & Télétravail',
      whatsappBtn: 'WhatsApp Direct',
      cvBtn: 'Consulter CV',
      formTitle: 'Envoyer un Message',
      formSubtitle: 'Transmettez votre offre, proposition de mission ou question technique directement.',
      nameLabel: 'Votre Nom / Entreprise *',
      namePlaceholder: 'Ex: Orange Digital, Tech Partner...',
      emailInputLabel: 'Votre Email *',
      emailPlaceholder: 'nom@entreprise.com',
      subjectLabel: 'Sujet de l\'échange',
      subjectPlaceholder: 'Ex: Opportunité Ingénieur Cloud Junior / Projet AWS',
      messageLabel: 'Détail du message *',
      messagePlaceholder: 'Présentez brièvement vos besoins d\'infrastructure ou la mission envisagée...',
      sendBtn: 'Envoyer le message',
      successTitle: 'Message Transmis avec Succès',
      successMsg: 'Merci pour votre message ! Bakary Camara vous répondra dans les plus brefs délais.',
      responseTime: 'Temps de réponse habituel : < 24h',
      copied: 'Copié dans le presse-papier !'
    },
    resume: {
      title: 'Curriculum Vitae — Bakary Camara',
      formatTag: 'Format Professionnel AWS',
      copyBtn: 'Copier le texte',
      copiedBtn: 'Copié !',
      printBtn: 'Imprimer / PDF',
      closeBtn: 'Fermer',
      professionalSummary: 'RÉSUMÉ PROFESSIONNEL',
      certificationsTitle: 'CERTIFICATIONS & FORMATIONS CLOUD',
      projectsTitle: 'PROJETS CLOUD (PROJETS PERSONNELS)',
      skillsTitle: 'COMPÉTENCES TECHNIQUES',
      educationTitle: 'FORMATION ACADÉMIQUE',
      languagesTitle: 'LANGUES',
      interestsTitle: 'CENTRES D\'INTÉRÊT'
    },
    notifications: {
      title: 'Centre d\'Alertes & Notifications Push',
      subtitle: 'Événements critiques CloudWatch & Sécurité',
      browserPush: 'Notifications Push Navigateur',
      enablePush: 'Autoriser les notifications push',
      pushEnabled: 'Notifications push actives dans votre navigateur.',
      eventsCount: 'événement(s) enregistré(s)',
      simulateAlert: 'Simuler alerte',
      markAllRead: 'Tout marquer lu',
      emptyTitle: 'Aucune alerte active pour le moment.',
      emptyDesc: 'Les alertes d\'infrastructure apparaîtront ici.',
      clearHistory: 'Effacer l\'historique',
      close: 'Fermer'
    },
    footer: {
      rights: 'Tous droits réservés. Hébergement statique optimisé.',
      cvLink: 'Curriculum Vitae',
      top: 'Haut'
    }
  },
  en: {
    nav: {
      home: 'Home',
      projects: 'Cloud Projects',
      cloudwatch: 'Live CloudWatch',
      skills: 'Skills',
      certifications: 'Certifications',
      testimonials: 'Testimonials',
      contact: 'Contact',
      discuss: 'Get in Touch',
      themeLight: 'Light mode',
      themeDark: 'Dark mode',
      notifications: 'Alerts'
    },
    hero: {
      statusBadge: 'Available immediately',
      role: 'Junior Cloud Engineer (AWS) & DevOps',
      titleLine1: 'Highly Available',
      titleLine2: 'Cloud Architectures',
      subtitle: 'Junior AWS / Cloud Assistant',
      summary: 'AWS Certified Solutions Architect – Associate (SAA-C03). Specialized in resilient Multi-AZ designs, automated Terraform & Ansible workflows, and serverless FinOps cost reduction (-62% compute spend).',
      stat1Label: 'Multi-AZ Availability',
      stat2Label: 'Compute cost savings',
      stat3Label: 'Automatic failover',
      btnProjects: 'Explore all 4 projects',
      btnCloudWatch: 'Live Dashboard',
      btnCV: 'View Resume',
      awsRegionStatus: 'AWS Region: eu-west-3 (Paris)',
      healthy: '100% HEALTHY',
      shadersActive: 'WebGL & Shaders Active',
      openCloudwatch: 'Open Console'
    },
    projects: {
      tag: '01. Cloud Engineering & Hands-on Projects',
      title: 'Infrastructure & Automation',
      subtitle: 'Production-ready cloud architectures designed, tested, and validated on AWS, from Multi-AZ resilience to declarative Terraform & Ansible pipelines.',
      all: 'All Projects (4)',
      filterHa: 'High Availability',
      filterIac: 'Infrastructure as Code',
      filterFinops: 'Serverless FinOps',
      filterDocker: 'Docker & ECR',
      viewDetails: 'Inspect Architecture & Code',
      modalSubtitle: 'Personal AWS Project',
      problemTitle: 'Technical Challenge',
      solutionTitle: 'Architected Solution',
      componentsTitle: 'Architecture Components',
      resultsTitle: 'Concrete Outcomes & Metrics',
      codeSnippetTitle: 'IaC & Script Snippet',
      copyCode: 'Copy Code',
      copiedCode: 'Copied to clipboard!',
      githubLink: 'View GitHub Repository',
      closeBtn: 'Close',
      simulationTitle: 'Multi-AZ Fault Tolerance Simulator',
      simulationDesc: 'Test the automatic failover resilience engineered by Bakary.',
      simulateFailoverBtn: 'Simulate AZ-a Failure',
      zoneA: 'Zone eu-west-3a',
      zoneB: 'Zone eu-west-3b',
      normalStatus: 'OPERATIONAL',
      outageStatus: 'SIMULATED OUTAGE',
      failoverSuccess: 'Test verified: 100% traffic rerouted by ALB without session disruption. Detection under 15s.',
      finopsCalcTitle: 'FinOps Savings Calculator',
      finopsCalcDesc: 'Adjust the dev instance count to calculate monthly cost savings generated by the Lambda scheduler.',
      finopsDevInstances: 'Tagged EC2 Dev Instances',
      finopsSavingsLabel: 'Estimated Monthly Savings (-62%)'
    },
    cloudwatch: {
      tag: '02. Real-Time Infrastructure Monitoring',
      title: 'CloudWatch Dashboard',
      subtitle: 'Interactive telemetry console simulating live operational metrics across Bakary\'s AWS architectures (compute load, ALB latency, RDS replication, FinOps).',
      live: 'Live stream',
      pause: 'Paused',
      surgeBtn: 'Simulate traffic surge',
      surgingBtn: 'Surge in progress...',
      configTitle: 'Alert settings & thresholds',
      exportJson: 'Export JSON metrics',
      syncLabel: 'Real-time telemetry stream',
      envAll: 'All Environments',
      envProd: 'Production (Multi-AZ)',
      envStaging: 'Staging',
      envDev: 'Dev FinOps (-62%)',
      alertThreshold: 'CloudWatch CPU Alert Threshold',
      refreshSpeed: 'Refresh Interval',
      recentHistory: 'Recent metric history',
      slaNote: 'Resilience Target SLA: 99.9% · Multi-AZ Failover: < 5 min'
    },
    skills: {
      tag: '03. Technical Capabilities & Stack',
      title: 'AWS, IaC & DevOps Expertise',
      subtitle: 'Rigorous engineering foundation built on real-world implementations, the AWS re/Start program, and the SAA-C03 certification.',
      searchPlaceholder: 'Search a skill (e.g. Terraform, VPC)...',
      all: 'All Skills',
      catCloud: 'AWS & Cloud',
      catIac: 'IaC & Automation',
      catDevops: 'DevOps & Linux',
      catNetwork: 'Networking & IT Support',
      catDev: 'Web & Scripting',
      verifiedBadge: 'Validated in live AWS projects',
      noResults: 'No matching skills found.'
    },
    certifications: {
      tag: '04. Industry Certifications & Credentials',
      title: 'Official AWS Accreditations',
      subtitle: 'Verified credentials from Amazon Web Services, Coursera, and Orange Digital Center Mali.',
      viewCert: 'Details & Verification',
      officialPage: 'Official AWS Certification Page',
      closeModal: 'Close',
      academicTitle: 'Higher Education & Foundation',
      academicTag: 'Academic Degrees'
    },
    testimonials: {
      tag: '05. Verified Recommendations',
      title: 'Endorsements & Technical Feedback',
      subtitle: 'Feedback from AWS certified mentors, technical trainers, and senior engineers who supervised Bakary.'
    },
    contact: {
      tag: '06. Get in Touch & Opportunities',
      title: 'Let\'s Build Resilient Cloud Systems',
      subtitle: 'Open to Junior Cloud Engineer (AWS), Cloud Assistant, or DevOps positions. Ready to onboard immediately.',
      directTitle: 'Direct Contact Details',
      emailLabel: 'Professional Email',
      phoneLabel: 'Phone / WhatsApp',
      locLabel: 'Location',
      mobility: 'International mobility & Remote work',
      whatsappBtn: 'Direct WhatsApp',
      cvBtn: 'View Resume',
      formTitle: 'Send a Message',
      formSubtitle: 'Feel free to reach out regarding job offers, consultancy, or technical discussions.',
      nameLabel: 'Your Name / Company *',
      namePlaceholder: 'e.g., Tech Recruiter, Enterprise...',
      emailInputLabel: 'Your Email *',
      emailPlaceholder: 'name@company.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'e.g., Junior Cloud Engineer Opportunity',
      messageLabel: 'Message Details *',
      messagePlaceholder: 'Briefly describe your cloud infrastructure needs or role requirements...',
      sendBtn: 'Send Message',
      successTitle: 'Message Sent Successfully',
      successMsg: 'Thank you! Bakary Camara will get back to you promptly.',
      responseTime: 'Usual response time: < 24h',
      copied: 'Copied to clipboard!'
    },
    resume: {
      title: 'Curriculum Vitae — Bakary Camara',
      formatTag: 'AWS Professional Profile',
      copyBtn: 'Copy Text',
      copiedBtn: 'Copied!',
      printBtn: 'Print / PDF',
      closeBtn: 'Close',
      professionalSummary: 'PROFESSIONAL SUMMARY',
      certificationsTitle: 'CERTIFICATIONS & CLOUD TRAINING',
      projectsTitle: 'CLOUD PROJECTS (HANDS-ON WORK)',
      skillsTitle: 'TECHNICAL SKILLS',
      educationTitle: 'ACADEMIC BACKGROUND',
      languagesTitle: 'LANGUAGES',
      interestsTitle: 'INTERESTS'
    },
    notifications: {
      title: 'Alert Center & Push Notifications',
      subtitle: 'Critical CloudWatch & Infrastructure Events',
      browserPush: 'Browser Push Notifications',
      enablePush: 'Enable Push Notifications',
      pushEnabled: 'Push notifications are enabled in your browser.',
      eventsCount: 'event(s) logged',
      simulateAlert: 'Simulate alert',
      markAllRead: 'Mark all as read',
      emptyTitle: 'No active alerts currently.',
      emptyDesc: 'CloudWatch infrastructure events will appear here.',
      clearHistory: 'Clear history',
      close: 'Close'
    },
    footer: {
      rights: 'All rights reserved. Optimized static portfolio.',
      cvLink: 'Resume / CV',
      top: 'Top'
    }
  },
  bm: {
    nav: {
      home: 'Dahbɔ',
      projects: 'Porozew',
      cloudwatch: 'CloudWatch Kɛnɛ',
      skills: 'Faanikodow',
      certifications: 'Seereyaw',
      testimonials: 'Kasebeyaw',
      contact: 'Weleli',
      discuss: 'Kumabaa',
      themeLight: 'Yeelen kɛnɛ',
      themeDark: 'Dibi kɛnɛ',
      notifications: 'Laseliw'
    },
    hero: {
      statusBadge: 'Kɛrɛnbara labɛnnen don sisan',
      role: 'AWS Cloud / DevOps baarakɛla dɔgɔman',
      titleLine1: 'Cloud Hakilintanya',
      titleLine2: 'Sabati Sabatilenba',
      subtitle: 'Bakary Camara / AWS Kɛnɛ Dɛmɛbaga',
      summary: 'AWS Solutions Architect – Associate (SAA-C03) seereya sɔrɔbagatɔ. Multi-AZ jɛkulu, Terraform ani Ansible baarakɛminɛnw dɔnbaa, ani serverless sɔngɔ dɔgɔyali (-62%).',
      stat1Label: 'Multi-AZ sabatili',
      stat2Label: 'Sɔngɔ dɔgɔyalen',
      stat3Label: 'Tɛmɛli teliyalen',
      btnProjects: 'Porozew 4 filɛ',
      btnCloudWatch: 'CloudWatch lajɛ',
      btnCV: 'CV lajɛ',
      awsRegionStatus: 'AWS Jamana: eu-west-3 (Paris)',
      healthy: '100% KƐNƐ DON',
      shadersActive: 'WebGL nin Shaders bɛ baara la',
      openCloudwatch: 'Kɛnɛ dayɛlɛ'
    },
    projects: {
      tag: '01. Cloud Baaraw ani Yɛrɛmahɔrɔnyalen',
      title: 'Infrastructures & Kɔrɔsili',
      subtitle: 'AWS kɔnɔ porozew sɛbɛnw, Multi-AZ sabatili ani Terraform nin Ansible kɔrɔsili baarakɛminɛnw.',
      all: 'Porozew bɛɛ (4)',
      filterHa: 'Haute Disponibilité',
      filterIac: 'Terraform & Ansible',
      filterFinops: 'FinOps Serverless',
      filterDocker: 'Docker & ECR',
      viewDetails: 'Porozew dɔnko lajɛ',
      modalSubtitle: 'Bakary ka AWS Porozew',
      problemTitle: 'Gɛlɛya kɔnɔna',
      solutionTitle: 'Furancɛ furakɛli',
      componentsTitle: 'Baarakɛminɛnw',
      resultsTitle: 'Kɔlɔlɔw kɛnɛma',
      codeSnippetTitle: 'Kodi sɛbɛn kɔrɔ',
      copyCode: 'Kodi ladege',
      copiedCode: 'A ladegera ka ban!',
      githubLink: 'GitHub kɔnɔ filɛ',
      closeBtn: 'A datugu',
      simulationTitle: 'Multi-AZ Gɛlɛya Kɔrɔsili',
      simulationDesc: 'N\'i ye AZ-a datugu, lajɛ cogo min na ALB bɛ tɛmɛ AZ-b kan.',
      simulateFailoverBtn: 'AZ-a Kari k\'a filɛ',
      zoneA: 'Zone eu-west-3a',
      zoneB: 'Zone eu-west-3b',
      normalStatus: 'KƐNƐ DON',
      outageStatus: 'KARI DƆN',
      failoverSuccess: 'Sɔrɔli ɲuman: ALB y\'a tɛmɛ AZ-b kan sɔnko tɛ tila!',
      finopsCalcTitle: 'FinOps Sɔngɔ Jatebaga',
      finopsCalcDesc: 'Instances jateden yɛlɛma k\'a filɛ wariko min bɛ mara kalo kɔnɔ.',
      finopsDevInstances: 'EC2 Dev Masirikow',
      finopsSavingsLabel: 'Kalo kɔnɔ wariko maralen (-62%)'
    },
    cloudwatch: {
      tag: '02. Kunnafoniw Sisan-sisan',
      title: 'CloudWatch Hakilitigiya',
      subtitle: 'Bakary ka AWS baarakɛminɛnw kɔrɔsili (CPU, ALB latence, RDS jɛgɛli ani FinOps sɔngɔ).',
      live: 'Sisan na',
      pause: 'A jɔra',
      surgeBtn: 'Dɔ fara baara kan',
      surgingBtn: 'Baara bɛ ka juguya...',
      configTitle: 'Labɛnniw',
      exportJson: 'JSON bɔ kɛnɛma',
      syncLabel: 'Sisan kunnafoniw bɛ tɛmɛ',
      envAll: 'Kɛnɛ bɛɛ',
      envProd: 'Production (Multi-AZ)',
      envStaging: 'Staging',
      envDev: 'Dev FinOps (-62%)',
      alertThreshold: 'CPU Alerte hakɛ',
      refreshSpeed: 'Teliyali hakɛ',
      recentHistory: 'Kunnafoni kɔrɔw',
      slaNote: 'Disponibilité: 99.9% · Failover: < 5 min'
    },
    skills: {
      tag: '03. Faanikodow & Sebaayaw',
      title: 'AWS, IaC ani DevOps Donko',
      subtitle: 'AWS re/Start kalo 5 kalan ani Solutions Architect Associate (SAA-C03) seereya.',
      searchPlaceholder: 'Dɔnko dɔ ɲini (misali: Terraform, VPC)...',
      all: 'Dɔnkow bɛɛ',
      catCloud: 'AWS & Cloud',
      catIac: 'Terraform & Ansible',
      catDevops: 'DevOps & Linux',
      catNetwork: 'Réseaux & Support',
      catDev: 'Web & Python',
      verifiedBadge: 'A baaratara AWS kɔnɔ',
      noResults: 'Foyi ma sɔrɔ.'
    },
    certifications: {
      tag: '04. Seereyaw & Kunnafonisɛbɛnw',
      title: 'AWS Seereya Sɛbɛnw',
      subtitle: 'Amazon Web Services, Coursera ani Orange Digital Center ka seereyaw.',
      viewCert: 'Seereya lajɛ',
      officialPage: 'AWS Kunnafonisɛbɛn',
      closeModal: 'A datugu',
      academicTitle: 'Kalan kɔrɔbaw',
      academicTag: 'Diplômew & Kalanso'
    },
    testimonials: {
      tag: '05. Kasebeyaw',
      title: 'Karamɔgɔw ka Kuma',
      subtitle: 'AWS karamɔgɔw ani ɲɔgɔnw ka seereya Bakary ka baaraw kan.'
    },
    contact: {
      tag: '06. Bakary Weleli',
      title: 'An ka jɛ ka baara kɛ Cloud kan',
      subtitle: 'Bakary bɛ baara ɲini AWS Cloud Junior, Cloud Assistant walima DevOps fan fɛ. A labɛnnen don sisan.',
      directTitle: 'Welelicogow',
      emailLabel: 'Email barika',
      phoneLabel: 'Telefoni / WhatsApp',
      locLabel: 'Yɔrɔ',
      mobility: 'Mali, Jamana wɛrɛw ani Télétravail',
      whatsappBtn: 'WhatsApp Kɛnɛ',
      cvBtn: 'CV lajɛ',
      formTitle: 'Cikan ci Bakary ma',
      formSubtitle: 'I ka ci walima baarakow sɛbɛn yan.',
      nameLabel: 'I tɔgɔ walima Baarakɛda *',
      namePlaceholder: 'Misali: Tech Lead, Recruteur...',
      emailInputLabel: 'I ka Email *',
      emailPlaceholder: 'togo@baara.com',
      subjectLabel: 'Kuma kuntilenna',
      subjectPlaceholder: 'Misali: AWS Junior Baara',
      messageLabel: 'Cikan kɔnɔkow *',
      messagePlaceholder: "A fɔ k'i b'a fɛ an k'a kɛ cogo min na...",
      sendBtn: 'Cikan ci',
      successTitle: 'Cikan cira ka ban',
      successMsg: 'I ni ce! Bakary bɛna i jaabi sisan.',
      responseTime: 'Jaabili teliyali : < 24h kɔnɔ',
      copied: 'A ladegera!'
    },
    resume: {
      title: 'Curriculum Vitae — Bakary Camara',
      formatTag: 'AWS Seereyatigi',
      copyBtn: 'Sɛbɛn ladege',
      copiedBtn: 'A ladegera!',
      printBtn: 'A bɔ karatasi kan / PDF',
      closeBtn: 'A datugu',
      professionalSummary: 'BAARA SƆRƆLI KUNNAFONI',
      certificationsTitle: 'SEEREYAW & AWS KALAN',
      projectsTitle: 'AWS POROZEW',
      skillsTitle: 'DƆNKOW & SEBAAYAW',
      educationTitle: 'KALAN KƆRƆW',
      languagesTitle: 'KANW',
      interestsTitle: 'N\'I DIYANYE KOW'
    },
    notifications: {
      title: 'Laseliw & Push Kɛnɛ',
      subtitle: 'CloudWatch kɔrɔsili kow',
      browserPush: 'Navigaeur Push Laseli',
      enablePush: 'Laseliw dayɛlɛ',
      pushEnabled: 'Push laseliw dayɛlɛnen don.',
      eventsCount: 'laseliw kɛra',
      simulateAlert: 'Alerte kɔrɔsi',
      markAllRead: 'A bɛɛ kalan',
      emptyTitle: 'Laseli kura t\'aye sisan.',
      emptyDesc: 'CloudWatch kow bɛna bɔ yan.',
      clearHistory: 'A bɛɛ josi',
      close: 'A datugu'
    },
    footer: {
      rights: 'Hakɛw bɛɛ lakandolen don. Static web application.',
      cvLink: 'Curriculum Vitae',
      top: 'Sanfɛ'
    }
  }
};
