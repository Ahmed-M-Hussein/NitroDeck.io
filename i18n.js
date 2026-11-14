/* Homepage translations: English (from the HTML), French and Arabic (RTL).
   Elements carry data-i18n="id" (text) and data-i18n-attr="attr=id,attr=id" (attributes).
   English is captured from the page itself, so the page reads correctly without JavaScript.
   Deck strings use their English text as the key. Missing keys fall back to English. */
(() => {
  "use strict";
  const FR = {
    "nav.features": "Fonctionnalités", "nav.companion": "App compagnon", "nav.map": "Carte des fonctions", "nav.business": "Pour les équipes", "nav.demo": "Démo", "nav.packs": "Packs",
    "cta.start": "Commencer", "nav.label": "Site", "lang.label": "Langue", "nav.theme": "Basculer entre thème clair et sombre",
    "hero.eyebrow": "Votre tablette. Votre pupitre de contrôle.", "hero.h1a": "Votre bureau,", "hero.h1b": "à portée d'un tap.",
    "hero.lede": "Transformez n'importe quel iPad ou tablette Android en centre de commande pour votre Mac et votre PC. Lancez, exécutez, coupez le son et livrez d'un seul tap.",
    "hero.watch": "Voir la démo", "hero.platforms": "iPad · Android · macOS · Windows",
    "hero.deckalt": "Écran d'accueil NitroDeck avec tuiles de build, de test et de déploiement, widgets système, curseurs et résumé Git",
    "chip.build": "Build et déploiement", "chip.running": "en cours", "chip.tests": "Lancer les tests", "chip.passed": "réussis", "chip.approval": "attend votre accord",
    "marquee.label": "Compatible avec les applis que vous utilisez",
    "how.eyebrow": "Comment ça marche", "how.h2": "Un tap. Quatre étapes. Zéro friction.",
    "how.sub": "Votre tablette est la télécommande. Une petite appli compagnon sur votre ordinateur fait le travail, en privé, sur votre propre réseau.",
    "how.label": "Ce qui se passe quand vous touchez une tuile",
    "how.1t": "Tapez", "how.1p": "Touchez une tuile sur votre tablette pour ouvrir une appli, envoyer des touches, lancer une commande ou démarrer un workflow.",
    "how.2t": "Liaison sécurisée", "how.2p": "Votre tablette parle à votre ordinateur en Wi-Fi, VPN ou USB (Mac). Le lien est verrouillé sur l'ordinateur que vous avez associé.",
    "how.3t": "Vérifié", "how.3p": "L'appli compagnon vérifie que l'appareil est de confiance, que le profil est autorisé et que l'action existe dans sa propre disposition.",
    "how.4t": "Fait", "how.4p": "L'action s'exécute en local et le résultat s'affiche sur la tuile : en cours, réussi ou échec.",
    "feat.eyebrow": "Ce que vous obtenez", "feat.h2": "Quatre super-pouvoirs.", "feat.sub": "Le cœur de NitroDeck, et ce que chacun change à votre journée.",
    "f1.t": "Un tap. Et c'est fait.",
    "f1.p": "Chaque tuile lance une appli, déclenche un raccourci ou exécute une commande sur votre ordinateur, puis affiche le résultat directement sur la tuile. Regroupez-les en profils pour chaque type de travail et laissez la console suivre l'appli que vous utilisez.",
    "f1.b1": "16 types de tuiles, plus des widgets en direct", "f1.b2": "Curseurs et molettes pour le volume, la luminosité et plus", "f1.b3": "Des profils qui changent avec l'appli au premier plan",
    "f1.cap": "Touchez un profil, ou regardez-le suivre l'appli au premier plan.",
    "f1.deckalt": "Profils NitroDeck développeur, créatif et réunions, qui changent avec l'appli au premier plan",
    "f2.t": "Vos routines en un tap",
    "f2.p": "Enchaînez des étapes dans un workflow, par exemple vérification des types, tests, build, avec des variables typées là où il le faut. Lancez-le depuis une tuile, suivez chaque étape en direct, mettez la suivante en file ou planifiez-la.",
    "f2.b1": "Progression en direct, journaux et zone de réponse", "f2.b2": "Planifiez une fois ou en répétition", "f2.b3": "Historique complet avec auteur et durées",
    "f2.alt": "File d'attente montrant un workflow de build avec vérification des types, tests et build",
    "f3.t": "L'IA propose. Vous validez.",
    "f3.p": "Choisissez parmi 19 assistants et fournisseurs, des outils locaux comme Codex et Claude Code aux API hébergées. Vous voyez d'abord le plan et la commande exacte, et rien ne s'exécute sans votre accord. Clés et identifiants restent sur votre ordinateur.",
    "f3.b1": "Approuver une fois, ou refuser", "f3.b2": "CLI locaux, API hébergées et runtimes locaux", "f3.b3": "Les identifiants restent sur votre ordinateur",
    "f3.alt": "Demande d'approbation IA pour exécuter une correction de lint",
    "f4.t": "Quatre ordinateurs. Une tablette.",
    "f4.p": "Associez chaque ordinateur une fois avec un code QR. Un même profil peut ensuite mélanger des tuiles de votre Mac, de votre PC Windows et plus, et chaque tuile indique à quel ordinateur elle appartient et s'il est en ligne.",
    "f4.b1": "Voyez quel ordinateur possède chaque tuile", "f4.b2": "Révoquez n'importe quel appareil, à tout moment", "f4.b3": "Partage de fichiers et du presse-papiers, sur option",
    "f4.alt": "Écran de connexion listant des Mac associés",
    "more.t": "Et ce n'est pas tout", "more.1": "4 thèmes", "more.2": "Partage de fichiers", "more.3": "Packs de raccourcis", "more.4": "Planifications", "more.5": "Sauvegardes", "more.6": "OBS et médias", "more.link": "Découvrir toutes les fonctions →",
    "comp.eyebrow": "App compagnon", "comp.h2": "Le cerveau sur votre ordinateur.",
    "comp.sub": "Installez-la sur chaque Mac ou PC Windows à contrôler. Elle affiche votre code d'association, construit vos profils et garde la configuration privée.",
    "comp.tabs": "Écrans de l'appli compagnon",
    "comp.alt1": "Page Profils de l'appli compagnon Windows avec une disposition de tuiles et la bibliothèque de contrôles",
    "comp.t1": "Profils", "comp.d1": "Disposez tuiles, groupes et widgets, et glissez des contrôles depuis la bibliothèque. Les changements arrivent aussitôt sur votre tablette.",
    "comp.alt2": "Page IA de l'appli compagnon Windows listant 19 assistants et fournisseurs",
    "comp.t2": "Assistants IA", "comp.d2": "Configurez l'un des 19 assistants. Connexions et clés restent sur ce PC ; seule la conversation atteint votre tablette.",
    "comp.nt": "Aussi dans l'appli", "comp.nd": "Projets, workflows, file d'attente, lanceur d'applis, commandes, intégrations, autorisations et sauvegarde.",
    "os.win": "Appli de zone de notification avec toute la surface de contrôle : contrôles du bureau, workflows, médias, OBS, partage de fichiers et configuration des assistants IA.",
    "os.mac": "Appli de barre des menus avec éditeur de disposition. Ajoute l'automatisation IA gérée, un lien USB vers votre tablette et les réunions du calendrier.",
    "map.eyebrow": "Carte des fonctions", "map.h2": "Tout ce qu'il y a dans la boîte.", "map.sub": "Dix domaines, une seule appli.",
    "m1.t": "Connexion", "m1.1": "Association par QR", "m1.2": "Wi-Fi, VPN, USB", "m1.3": "Jusqu'à 4 ordinateurs", "m1.4": "Profils combinés",
    "m2.t": "Console", "m2.1": "Profils et groupes", "m2.2": "16 types de tuiles", "m2.3": "Widgets", "m2.4": "Profils intelligents",
    "m3.t": "Personnalisation", "m3.1": "4 thèmes", "m3.2": "Icônes et couleurs", "m3.3": "Packs de départ", "m3.4": "Sauvegarde et packs portables",
    "m4.t": "Contrôles", "m4.1": "Volume, luminosité", "m4.2": "Curseurs et molettes", "m4.3": "Sélecteur de couleur", "m4.4": "Interrupteurs et choix",
    "m5.t": "Automatisation", "m5.1": "Workflows", "m5.2": "Variables typées", "m5.3": "File d'attente et planification", "m5.4": "Historique d'exécution",
    "m6.t": "Outils dev", "m6.1": "Projets et Git", "m6.2": "Résultats de tests", "m6.3": "Terminaux", "m6.4": "Captures, réunions",
    "m7.t": "IA", "m7.1": "Espace IA", "m7.2": "Approbations", "m7.3": "19 fournisseurs", "m7.4": "Diagnostic des échecs",
    "m8.t": "Jeu et streaming", "m8.1": "Panneaux OBS", "m8.2": "Clips Twitch", "m8.3": "Éclairage Hue", "m8.4": "Soundboard",
    "m9.t": "Partage", "m9.1": "Transfert de fichiers", "m9.2": "Synchro du presse-papiers", "m9.3": "Sur option, par ordinateur",
    "m10.t": "Sécurité", "m10.1": "TLS épinglé", "m10.2": "Appareils de confiance", "m10.3": "Autorisations", "m10.4": "Limites de ressources",
    "m11.t": "Tout voir", "m11.p": "Toutes les fonctions, avec recherche, ce qu'elles font et où elles fonctionnent.", "m11.l": "Ouvrir l'explorateur de fonctions →",
    "biz.eyebrow": "Pour les équipes et les entreprises", "biz.h2": "Une tablette, tous les rôles.", "biz.sub": "Donnez à chaque rôle son profil et gardez les contrôles utiles à un tap.",
    "b1.tag": "Réunions et présentations", "b1.t": "Gardez la salle en main", "b1.p": "Coupez le micro, partagez, changez de scène et faites défiler les diapos depuis une tablette posée sur la table, avec une page Réunions intégrée.", "b1.s": "Packs de raccourcis · Réunions · Profils",
    "b2.tag": "Studios et créateurs", "b2.t": "Éditez sans chercher les touches", "b2.p": "Partez des packs pour Photoshop, Premiere, DaVinci Resolve et Blender, puis ajoutez des molettes jog et vos propres tuiles.", "b2.s": "Packs d'applis · Molettes · Packs portables",
    "b3.tag": "Streaming et événements", "b3.t": "Passez en direct en toute confiance", "b3.p": "Scènes OBS, clips Twitch, éclairage Hue et soundboard sur un seul écran, avec l'état en direct sur chaque tuile.", "b3.s": "OBS · Twitch · Hue · Soundboard",
    "b4.tag": "Ingénierie et IT", "b4.t": "Livrez depuis votre bureau", "b4.p": "Build, test, déploiement et revue de l'état Git, avec des correctifs IA qui attendent votre accord.", "b4.s": "Workflows · File d'attente · Approbations IA",
    "b5.tag": "Bureaux multi-ordinateurs", "b5.t": "Plusieurs machines, une seule surface", "b5.p": "Contrôlez jusqu'à quatre Mac et PC depuis la même tablette, et envoyez fichiers et texte du presse-papiers entre eux.", "b5.s": "4 ordinateurs · Transfert de fichiers · Presse-papiers",
    "b6.tag": "Postes partagés et support", "b6.t": "Donnez l'accès, pas les clés", "b6.p": "Invitez un appareil avec un profil limité et un accès à la file en lecture seule. Passez en revue les appareils de confiance et révoquez-les à volonté.", "b6.s": "Invitations · Autorisations · Révocation",
    "biz.nb": "Contrôle et confidentialité :", "biz.nt": "local d'abord, TLS épinglé entre tablette et ordinateur, autorisations par appareil et sauvegardes que vous conservez.",
    "demo.eyebrow": "Démo", "demo.h2": "Voyez-le en action.", "demo.play": "Lire la démo NitroDeck",
    "packs.eyebrow": "Packs", "packs.h2": "Partez d'une console toute prête.", "packs.sub": "50 packs pour les applis que vous utilisez déjà. Installez-en un d'un clic.", "packs.label": "Exemples de packs", "packs.browse": "Parcourir tous les packs", "packs.make": "Créer le vôtre", "packs.tiles": "{n} tuiles",
    "start.eyebrow": "Commencer", "start.h2": "Trois étapes. Quelques minutes.",
    "s1.t": "Installer", "s1.p": "Récupérez l'appli tablette et l'appli compagnon pour votre ordinateur.", "s2.t": "Associer", "s2.p": "Scannez le code QR, puis approuvez sur votre ordinateur.", "s3.t": "Taper", "s3.p": "Ajoutez un pack ou vos propres tuiles et c'est parti.",
    "start.dl": "Télécharger depuis les versions", "start.more": "Détails de l'installation",
    "trust.eyebrow": "Privé par conception", "trust.h2": "Vous décidez de ce qui se connecte.",
    "tr1.t": "Vous validez l'association", "tr1.p": "Passez en revue et révoquez les appareils à tout moment.", "tr2.t": "Le partage est sur option", "tr2.p": "Fichiers et presse-papiers restent désactivés tant que vous ne les activez pas.", "tr3.t": "Les clés restent chez vous", "tr3.p": "Les identifiants d'intégration restent sur votre ordinateur.",
    "q1.q": "Faut-il un compte ?", "q1.a": "Aucun compte NitroDeck. Les services connectés et les outils IA utilisent leurs propres comptes.",
    "q2.q": "Qu'est-ce qui fonctionne avec quoi ?", "q2.a": "Tablettes iPad et Android, avec compagnons Mac et Windows. Les liens USB et les réunions du calendrier sont pour l'instant réservés au Mac ; l'USB sous Windows n'existe pas encore.",
    "q3.q": "Puis-je partager un pack ?", "q3.a": "Oui. Créez-en un dans le générateur et ouvrez une pull request pour l'ajouter à la marketplace.",
    "close.h2": "Moins de corvées. Plus d'élan.", "foot.tag": "NitroDeck · Votre bureau, à portée d'un tap.", "foot.gen": "Générateur",
    "meta.title": "NitroDeck — Votre bureau, à portée d'un tap", "meta.desc": "Transformez votre iPad ou tablette Android en centre de commande pour votre Mac et votre PC. Lancez, exécutez, coupez le son et livrez d'un seul tap.",
    // Deck
    "deck.front": "Appli au premier plan : {app} · profil {profile}", "Connected · Local": "Connecté · Local",
    "Developer": "Développeur", "Creative": "Créatif", "Meetings": "Réunions",
    "Build and ship": "Build et déploiement", "Run tests": "Lancer les tests", "Dev server": "Serveur dev", "Deploy": "Déployer", "Machine": "Machine", "System": "Système",
    "Memory": "Mémoire", "Disk": "Disque", "Battery": "Batterie", "Brightness": "Luminosité", "Everyday": "Au quotidien", "Screenshot": "Capture", "Mute": "Muet", "Mic": "Micro", "OBS scene": "Scène OBS",
    "Modified": "Modifiés", "Staged": "Indexés", "Ahead": "En avance", "128 ok": "128 ok", "Tools": "Outils", "Undo": "Annuler", "Redo": "Rétablir", "Brush": "Pinceau", "Eraser": "Gomme", "Layers": "Calques", "Export": "Exporter",
    "Adjust": "Réglages", "Brush size": "Taille du pinceau", "Opacity": "Opacité", "Color": "Couleur", "Lights": "Lumières", "Send file": "Envoyer", "Preset": "Préréglage", "Format": "Format", "Scale": "Échelle", "Queue": "File d'attente", "2 jobs": "2 tâches",
    "In the call": "Pendant l'appel", "Camera": "Caméra", "Share": "Partager", "Raise hand": "Lever la main", "Record": "Enregistrer", "Leave": "Quitter", "Room": "Salle",
    "Next meeting": "Prochaine réunion", "Design review": "Revue de design", "4 people · Zoom": "4 personnes · Zoom", "Join": "Rejoindre", "Speaker volume": "Volume haut-parleur", "Room lights": "Lumières de la salle",
    "Notes": "Notes", "Do not disturb": "Ne pas déranger", "Today": "Aujourd'hui", "Next": "Suivante", "Recording": "Enregistrement", "On": "Activé", "Live": "En direct",
    "Home": "Accueil", "Process": "Processus", "Settings": "Réglages",
  };

  const AR = {
    "nav.features": "المزايا", "nav.companion": "تطبيق الكمبيوتر", "nav.map": "خريطة المزايا", "nav.business": "للفرق والأعمال", "nav.demo": "عرض توضيحي", "nav.packs": "الحزم",
    "cta.start": "ابدأ الآن", "nav.label": "الموقع", "lang.label": "اللغة", "nav.theme": "التبديل بين الوضع الفاتح والداكن",
    "hero.eyebrow": "جهازك اللوحي. لوحة تحكمك.", "hero.h1a": "مكتبك،", "hero.h1b": "على بُعد لمسة.",
    "hero.lede": "حوّل أي جهاز iPad أو جهاز Android لوحي إلى مركز قيادة لجهاز Mac والكمبيوتر الشخصي. شغّل وأطلق واكتم الصوت وأنجز بلمسة واحدة.",
    "hero.watch": "شاهد العرض", "hero.platforms": "iPad · Android · macOS · Windows",
    "hero.deckalt": "الشاشة الرئيسية في NitroDeck مع بلاطات البناء والاختبار والنشر وعناصر النظام والمنزلقات وملخص Git",
    "chip.build": "البناء والنشر", "chip.running": "قيد التشغيل", "chip.tests": "تشغيل الاختبارات", "chip.passed": "نجحت", "chip.approval": "بانتظار موافقتك",
    "marquee.label": "يعمل مع التطبيقات التي تستخدمها",
    "how.eyebrow": "كيف يعمل", "how.h2": "لمسة واحدة. أربع خطوات. بلا تعقيد.",
    "how.sub": "جهازك اللوحي هو جهاز التحكم. وتطبيق صغير على حاسوبك يؤدي العمل، بخصوصية تامة وعلى شبكتك أنت.",
    "how.label": "ما يحدث عند لمس بلاطة",
    "how.1t": "المس", "how.1p": "المس بلاطة على جهازك اللوحي لفتح تطبيق أو إرسال اختصار أو تشغيل أمر أو بدء سير عمل.",
    "how.2t": "اتصال آمن", "how.2p": "يتحدث جهازك اللوحي مع حاسوبك عبر Wi-Fi أو VPN أو USB (على Mac). والاتصال مقيَّد بالحاسوب الذي اقترنت به.",
    "how.3t": "تحقق", "how.3p": "يتأكد التطبيق من أن الجهاز موثوق، وأن الملف الشخصي مسموح، وأن الإجراء موجود في تخطيطه.",
    "how.4t": "تم", "how.4p": "يُنفَّذ الإجراء محليًا وتُضاء البلاطة بالنتيجة: قيد التشغيل أو نجح أو فشل.",
    "feat.eyebrow": "ما ستحصل عليه", "feat.h2": "أربع قدرات خارقة.", "feat.sub": "جوهر NitroDeck، وما يقدمه كل منها ليومك.",
    "f1.t": "لمسة واحدة. وينتهي الأمر.",
    "f1.p": "كل بلاطة تفتح تطبيقًا أو تُطلق اختصارًا أو تنفّذ أمرًا على حاسوبك، ثم تعرض النتيجة على البلاطة نفسها. اجمع البلاطات في ملفات شخصية لكل نوع من العمل ودع اللوحة تتبع التطبيق الذي تستخدمه.",
    "f1.b1": "16 نوعًا من البلاطات، مع عناصر حية", "f1.b2": "منزلقات وأقراص للصوت والسطوع وغيرها", "f1.b3": "ملفات شخصية تتبدّل مع التطبيق الأمامي",
    "f1.cap": "المس ملفًا شخصيًا، أو شاهده يتبع التطبيق الأمامي.",
    "f1.deckalt": "ملفات NitroDeck للمطوّر والمبدع والاجتماعات، تتبدّل مع التطبيق الأمامي",
    "f2.t": "حوّل روتينك إلى لمسة",
    "f2.p": "اربط الخطوات في سير عمل واحد، مثل فحص الأنواع ثم الاختبار ثم البناء، مع متغيرات محددة النوع حيث تحتاجها. ابدأه من بلاطة، وتابع كل خطوة مباشرة، وأضف التشغيل التالي إلى الطابور أو جدوله لوقت لاحق.",
    "f2.b1": "تقدّم مباشر وسجلات ومربع للرد", "f2.b2": "جدولة مرة واحدة أو بشكل متكرر", "f2.b3": "سجل كامل للتشغيلات مع المالك والأوقات",
    "f2.alt": "الطابور يعرض سير عمل بناء بخطوات فحص الأنواع والاختبار والبناء",
    "f3.t": "الذكاء الاصطناعي يقترح. وأنت توافق.",
    "f3.p": "اختر من بين 19 مساعدًا ومزوّدًا، من أدوات محلية مثل Codex وClaude Code إلى واجهات API المستضافة. ترى الخطة والأمر بدقة أولًا، ولا يُنفَّذ شيء حتى توافق. المفاتيح وبيانات الدخول تبقى على حاسوبك.",
    "f3.b1": "وافق مرة واحدة أو ارفض", "f3.b2": "أدوات سطر أوامر محلية وواجهات API مستضافة وبيئات تشغيل محلية", "f3.b3": "بيانات الاعتماد تبقى على حاسوبك",
    "f3.alt": "طلب موافقة من الذكاء الاصطناعي لتنفيذ إصلاح Lint",
    "f4.t": "أربعة حواسيب. جهاز لوحي واحد.",
    "f4.p": "اقرن كل حاسوب مرة واحدة برمز QR. بعدها يمكن لملف شخصي واحد أن يجمع بلاطات من Mac وحاسوب Windows وغيرهما، وتوضح كل بلاطة الحاسوب الذي تتبع له وهل هو متصل.",
    "f4.b1": "اعرف أي حاسوب تتبع له كل بلاطة", "f4.b2": "ألغِ أي جهاز في أي وقت", "f4.b3": "مشاركة الملفات والحافظة، باختيارك",
    "f4.alt": "شاشة الاتصال تعرض أجهزة Mac المقترنة",
    "more.t": "وهناك المزيد", "more.1": "4 سمات", "more.2": "مشاركة الملفات", "more.3": "حزم الاختصارات", "more.4": "الجدولة", "more.5": "النسخ الاحتياطي", "more.6": "OBS والوسائط", "more.link": "استكشف كل المزايا ←",
    "comp.eyebrow": "تطبيق الكمبيوتر", "comp.h2": "العقل المدبّر على حاسوبك.",
    "comp.sub": "ثبّته على كل جهاز Mac أو كمبيوتر Windows تريد التحكم به. يعرض رمز الاقتران، ويبني ملفاتك الشخصية، ويُبقي الإعداد خاصًا.",
    "comp.tabs": "شاشات تطبيق الكمبيوتر",
    "comp.alt1": "صفحة الملفات الشخصية في تطبيق Windows مع تخطيط البلاطات ومكتبة عناصر التحكم",
    "comp.t1": "الملفات الشخصية", "comp.d1": "رتّب البلاطات والمجموعات والعناصر، واسحب عناصر التحكم من المكتبة. تصل التغييرات إلى جهازك اللوحي فورًا.",
    "comp.alt2": "صفحة الذكاء الاصطناعي في تطبيق Windows تعرض 19 مساعدًا ومزوّدًا",
    "comp.t2": "مساعدو الذكاء الاصطناعي", "comp.d2": "أعدّ أيًّا من 19 مساعدًا. الاتصالات والمفاتيح تبقى على هذا الحاسوب، ولا تصل إلى جهازك اللوحي سوى المحادثة.",
    "comp.nt": "وأيضًا في التطبيق", "comp.nd": "المشاريع وسير العمل والطابور ومشغّل التطبيقات والأوامر والتكاملات والأذونات والنسخ الاحتياطي.",
    "os.win": "تطبيق في شريط المهام بكامل واجهة التحكم: عناصر سطح المكتب وسير العمل والوسائط وOBS ومشاركة الملفات وإعداد مساعدي الذكاء الاصطناعي.",
    "os.mac": "تطبيق في شريط القوائم مع محرر للتخطيط. يضيف أتمتة الذكاء الاصطناعي المُدارة واتصال USB بجهازك اللوحي واجتماعات التقويم.",
    "map.eyebrow": "خريطة المزايا", "map.h2": "كل شيء في صندوق واحد.", "map.sub": "عشرة مجالات، تطبيق واحد.",
    "m1.t": "الاتصال", "m1.1": "الاقتران عبر QR", "m1.2": "Wi-Fi وVPN وUSB", "m1.3": "حتى 4 حواسيب", "m1.4": "ملفات شخصية مدمجة",
    "m2.t": "اللوحة", "m2.1": "ملفات شخصية ومجموعات", "m2.2": "16 نوعًا من البلاطات", "m2.3": "عناصر حية", "m2.4": "ملفات ذكية",
    "m3.t": "التخصيص", "m3.1": "4 سمات", "m3.2": "أيقونات وألوان", "m3.3": "حزم البداية", "m3.4": "نسخ احتياطي وحزم محمولة",
    "m4.t": "عناصر التحكم", "m4.1": "الصوت والسطوع", "m4.2": "منزلقات وأقراص", "m4.3": "منتقي الألوان", "m4.4": "مفاتيح وخيارات",
    "m5.t": "الأتمتة", "m5.1": "سير العمل", "m5.2": "متغيرات محددة النوع", "m5.3": "الطابور والجدولة", "m5.4": "سجل التشغيلات",
    "m6.t": "أدوات المطوّرين", "m6.1": "المشاريع وGit", "m6.2": "نتائج الاختبارات", "m6.3": "الطرفيات", "m6.4": "لقطات الشاشة والاجتماعات",
    "m7.t": "الذكاء الاصطناعي", "m7.1": "مساحة الذكاء الاصطناعي", "m7.2": "الموافقات", "m7.3": "19 مزوّدًا", "m7.4": "تشخيص الأعطال",
    "m8.t": "اللعب والبث", "m8.1": "لوحات OBS", "m8.2": "مقاطع Twitch", "m8.3": "إضاءة Hue", "m8.4": "لوحة المؤثرات الصوتية",
    "m9.t": "المشاركة", "m9.1": "نقل الملفات", "m9.2": "مزامنة الحافظة", "m9.3": "اختياري لكل حاسوب",
    "m10.t": "الأمان", "m10.1": "TLS مُثبَّت", "m10.2": "أجهزة موثوقة", "m10.3": "الأذونات", "m10.4": "حدود الموارد",
    "m11.t": "شاهد كل شيء", "m11.p": "كل ميزة مع بحث وشرح لما تفعله وأين تعمل.", "m11.l": "افتح مستكشف المزايا ←",
    "biz.eyebrow": "للفرق والأعمال", "biz.h2": "جهاز لوحي واحد، لكل دور.", "biz.sub": "امنح كل دور ملفه الشخصي، وأبقِ أدوات التحكم التي يحتاجها على بُعد لمسة.",
    "b1.tag": "الاجتماعات والعروض", "b1.t": "تحكّم بالقاعة", "b1.p": "اكتم الصوت وشارك وبدّل المشاهد وقلّب الشرائح من جهاز لوحي على الطاولة، مع صفحة اجتماعات مدمجة.", "b1.s": "حزم الاختصارات · الاجتماعات · الملفات الشخصية",
    "b2.tag": "الاستوديوهات والمبدعون", "b2.t": "حرّر دون البحث عن المفاتيح", "b2.p": "ابدأ من حزم Photoshop وPremiere وDaVinci Resolve وBlender، ثم أضف أقراص التمرير وبلاطاتك الخاصة.", "b2.s": "حزم التطبيقات · الأقراص · حزم محمولة",
    "b3.tag": "البث والفعاليات", "b3.t": "ابدأ البث بثقة", "b3.p": "مشاهد OBS ومقاطع Twitch وإضاءة Hue ولوحة مؤثرات صوتية على شاشة واحدة، مع الحالة الحية على كل بلاطة.", "b3.s": "OBS · Twitch · Hue · المؤثرات الصوتية",
    "b4.tag": "الهندسة وتقنية المعلومات", "b4.t": "أنجز من مكتبك", "b4.p": "ابنِ واختبر وانشر وراجع حالة Git، مع إصلاحات بالذكاء الاصطناعي تنتظر موافقتك.", "b4.s": "سير العمل · الطابور · موافقات الذكاء الاصطناعي",
    "b5.tag": "مكاتب متعددة الحواسيب", "b5.t": "عدة أجهزة، واجهة واحدة", "b5.p": "تحكّم بما يصل إلى أربعة حواسيب Mac وPC من الجهاز اللوحي نفسه، وأرسل الملفات ونص الحافظة بينها.", "b5.s": "4 حواسيب · نقل الملفات · الحافظة",
    "b6.tag": "المكاتب المشتركة والدعم", "b6.t": "امنح الوصول لا المفاتيح", "b6.p": "ادعُ جهازًا بنطاق ملف شخصي محدد ووصول للقراءة فقط إلى الطابور. راجع الأجهزة الموثوقة وألغِ أيًّا منها.", "b6.s": "الدعوات · الأذونات · الإلغاء",
    "biz.nb": "التحكم والخصوصية:", "biz.nt": "محلي أولًا، وTLS مُثبَّت بين الجهاز اللوحي والحاسوب، وأذونات لكل جهاز، ونسخ احتياطية تحتفظ بها.",
    "demo.eyebrow": "عرض توضيحي", "demo.h2": "شاهده يعمل.", "demo.play": "تشغيل العرض التوضيحي لـ NitroDeck",
    "packs.eyebrow": "الحزم", "packs.h2": "ابدأ بلوحة جاهزة.", "packs.sub": "50 حزمة للتطبيقات التي تستخدمها فعلًا. ثبّت أي حزمة بنقرة.", "packs.label": "أمثلة على الحزم", "packs.browse": "تصفّح كل الحزم", "packs.make": "أنشئ حزمتك", "packs.tiles": "{n} بلاطة",
    "start.eyebrow": "ابدأ", "start.h2": "ثلاث خطوات. دقائق قليلة.",
    "s1.t": "ثبّت", "s1.p": "نزّل تطبيق الجهاز اللوحي والتطبيق المرافق لحاسوبك.", "s2.t": "اقترن", "s2.p": "امسح رمز QR ثم وافق على حاسوبك.", "s3.t": "المس", "s3.p": "أضف حزمة أو بلاطاتك الخاصة وانطلق.",
    "start.dl": "التنزيل من الإصدارات", "start.more": "تفاصيل الإعداد",
    "trust.eyebrow": "خصوصية بالتصميم", "trust.h2": "أنت من يقرر ما يتصل.",
    "tr1.t": "أنت توافق على الاقتران", "tr1.p": "راجع الأجهزة وألغِ أيًّا منها في أي وقت.", "tr2.t": "المشاركة اختيارية", "tr2.p": "تبقى الملفات والحافظة متوقفة حتى تفعّلها.", "tr3.t": "المفاتيح تبقى عندك", "tr3.p": "بيانات اعتماد التكاملات تبقى على حاسوبك.",
    "q1.q": "هل أحتاج إلى حساب؟", "q1.a": "لا حاجة إلى حساب NitroDeck. الخدمات المتصلة وأدوات الذكاء الاصطناعي تستخدم حساباتها الخاصة.",
    "q2.q": "ما الذي يعمل مع ماذا؟", "q2.a": "أجهزة iPad وAndroid اللوحية، مع تطبيقات Mac وWindows المرافقة. اتصال USB واجتماعات التقويم متاحان على Mac فقط حاليًا، ولم يُنجَز USB على Windows بعد.",
    "q3.q": "هل يمكنني مشاركة حزمة؟", "q3.a": "نعم. أنشئ حزمة في المولّد وافتح طلب سحب لإضافتها إلى المتجر.",
    "close.h2": "عمل أقل. زخم أكبر.", "foot.tag": "NitroDeck · مكتبك، على بُعد لمسة.", "foot.gen": "المولّد",
    "meta.title": "NitroDeck — مكتبك، على بُعد لمسة", "meta.desc": "حوّل جهاز iPad أو Android اللوحي إلى مركز قيادة لجهاز Mac والكمبيوتر. شغّل وأطلق واكتم الصوت وأنجز بلمسة واحدة.",
    // Deck
    "deck.front": "التطبيق الأمامي: {app} · تم التبديل إلى {profile}", "Connected · Local": "متصل · محلي",
    "Developer": "المطوّر", "Creative": "الإبداع", "Meetings": "الاجتماعات",
    "Build and ship": "البناء والنشر", "Run tests": "تشغيل الاختبارات", "Dev server": "خادم التطوير", "Deploy": "نشر", "Machine": "الجهاز", "System": "النظام",
    "Memory": "الذاكرة", "Disk": "القرص", "Battery": "البطارية", "Volume": "الصوت", "Brightness": "السطوع", "Everyday": "يوميًا", "Screenshot": "لقطة شاشة", "Mute": "كتم", "Mic": "الميكروفون", "OBS scene": "مشهد OBS", "Focus": "التركيز",
    "Modified": "معدّلة", "Staged": "مُجهَّزة", "Ahead": "متقدّم", "Tests": "الاختبارات", "128 ok": "128 ناجح", "Tools": "الأدوات", "Undo": "تراجع", "Redo": "إعادة", "Brush": "فرشاة", "Eraser": "ممحاة", "Layers": "الطبقات", "Export": "تصدير",
    "Adjust": "ضبط", "Brush size": "حجم الفرشاة", "Opacity": "التعتيم", "Color": "اللون", "Zoom": "التكبير", "Lights": "الإضاءة", "Send file": "إرسال ملف", "Preset": "إعداد", "Format": "الصيغة", "Scale": "المقياس", "Queue": "الطابور", "2 jobs": "مهمتان",
    "In the call": "أثناء المكالمة", "Camera": "الكاميرا", "Share": "مشاركة", "Raise hand": "رفع اليد", "Record": "تسجيل", "Leave": "مغادرة", "Room": "القاعة",
    "Next meeting": "الاجتماع القادم", "Design review": "مراجعة التصميم", "4 people · Zoom": "4 أشخاص · Zoom", "Join": "انضمام", "Speaker volume": "صوت السماعة", "Room lights": "إضاءة القاعة",
    "Chat": "الدردشة", "Notes": "الملاحظات", "Do not disturb": "عدم الإزعاج", "Today": "اليوم", "Next": "التالي", "Recording": "التسجيل", "On": "مفعّل", "Live": "مباشر",
    "Home": "الرئيسية", "Process": "العمليات", "Settings": "الإعدادات",
  };

  const EN = {
    "meta.title": "NitroDeck — Your desk, one tap away",
    "meta.desc": "Turn your iPad or Android tablet into a command center for your Mac and PC. Launch, run, mute and ship with one tap.",
    "packs.tiles": "{n} tiles",
    "deck.front": "Front app: {app} · switched to {profile}",
  };
  const dicts = { en: EN, fr: FR, ar: AR };
  const $$ = (s) => document.querySelectorAll(s);
  const metaKey = document.documentElement.dataset.i18nMeta || "meta";
  if (metaKey !== "meta") {
    EN[metaKey + ".title"] = document.title;
    const d0 = document.querySelector('meta[name="description"]'); EN[metaKey + ".desc"] = d0 ? d0.getAttribute("content") : "";
  }

  // Capture English from the page.
  $$("[data-i18n]").forEach((n) => { EN[n.dataset.i18n] = n.textContent; });
  const attrNodes = [...$$("[data-i18n-attr]")];
  attrNodes.forEach((n) => {
    for (const pair of n.dataset.i18nAttr.split(",")) {
      const [attr, id] = pair.split("=");
      EN[id] = n.getAttribute(attr) || EN[id] || "";
    }
  });
  // Alt text that lives only in data attributes (companion tabs).
  EN["comp.alt2"] = "Windows companion app AI page listing 19 assistants and providers";

  const SUPPORTED = ["en", "fr", "ar"];
  let lang = "en";

  function t(key, vars) {
    let s = (dicts[lang] && dicts[lang][key]) ?? EN[key] ?? key;
    if (vars) for (const k of Object.keys(vars)) s = s.replace("{" + k + "}", vars[k]);
    return s;
  }

  function apply() {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    $$("[data-i18n]").forEach((n) => { n.textContent = t(n.dataset.i18n); });
    attrNodes.forEach((n) => {
      for (const pair of n.dataset.i18nAttr.split(",")) {
        const [attr, id] = pair.split("=");
        n.setAttribute(attr, t(id));
      }
    });
    document.title = t(metaKey + ".title");
    const md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute("content", t(metaKey + ".desc"));
    $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    document.dispatchEvent(new CustomEvent("ndlang", { detail: { lang } }));
  }

  function set(next, persist) {
    if (!SUPPORTED.includes(next)) next = "en";
    lang = next;
    if (persist) { try { localStorage.setItem("nd-lang", next); } catch (_) { /* Storage is optional. */ } }
    apply();
  }

  let saved = null;
  try { saved = localStorage.getItem("nd-lang"); } catch (_) { /* Storage is optional. */ }
  const guess = (navigator.language || "en").slice(0, 2).toLowerCase();
  lang = SUPPORTED.includes(saved) ? saved : SUPPORTED.includes(guess) ? guess : "en";

  function extend(more) {
    Object.assign(FR, more.fr || {}); Object.assign(AR, more.ar || {});
    if (lang !== "en") apply();
  }

  window.NDI18N = { t, get lang() { return lang; }, set, extend };
  $$(".lang button").forEach((b) => b.addEventListener("click", () => set(b.dataset.lang, true)));
  if (lang !== "en") apply(); else $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === "en")));
})();
