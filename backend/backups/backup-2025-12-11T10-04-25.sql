--
-- PostgreSQL database dump
--

-- Dumped from database version 17.7 (178558d)
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Archive; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Archive" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    content text NOT NULL,
    "coverImage" text NOT NULL,
    images text[],
    type text DEFAULT 'story'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Archive" OWNER TO neondb_owner;

--
-- Name: Challenge; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Challenge" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "shortDescription" text NOT NULL,
    status text NOT NULL,
    category text[],
    organizer text NOT NULL,
    "prizePool" integer NOT NULL,
    currency text NOT NULL,
    "totalParticipants" integer DEFAULT 0 NOT NULL,
    "totalViews" integer DEFAULT 0 NOT NULL,
    "totalSubmissions" integer DEFAULT 0 NOT NULL,
    "startDate" text NOT NULL,
    "endDate" text NOT NULL,
    "imageUrl" text NOT NULL,
    difficulty text NOT NULL,
    tags text[],
    location text,
    overview jsonb NOT NULL,
    rules text[],
    assets jsonb[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    type text DEFAULT 'standard'::text NOT NULL
);


ALTER TABLE public."Challenge" OWNER TO neondb_owner;

--
-- Name: ChallengeView; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."ChallengeView" (
    id text NOT NULL,
    "challengeId" text NOT NULL,
    "userId" text,
    "ipAddress" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ChallengeView" OWNER TO neondb_owner;

--
-- Name: ContactSubmission; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."ContactSubmission" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    subject text NOT NULL,
    message text NOT NULL,
    status text DEFAULT 'new'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ContactSubmission" OWNER TO neondb_owner;

--
-- Name: Participant; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Participant" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "challengeId" text NOT NULL,
    status text DEFAULT 'registered'::text NOT NULL,
    "joinedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Participant" OWNER TO neondb_owner;

--
-- Name: Submission; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Submission" (
    id text NOT NULL,
    "challengeId" text NOT NULL,
    "userId" text NOT NULL,
    creativity integer,
    technical integer,
    adherence integer,
    "totalScore" double precision,
    "fileUrl" text NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL
);


ALTER TABLE public."Submission" OWNER TO neondb_owner;

--
-- Name: User; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text,
    name text NOT NULL,
    picture text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    role text DEFAULT 'user'::text NOT NULL,
    "welcomeEmailSent" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."User" OWNER TO neondb_owner;

--
-- Name: WorkshopApplication; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."WorkshopApplication" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    statement text NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."WorkshopApplication" OWNER TO neondb_owner;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO neondb_owner;

--
-- Data for Name: Archive; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Archive" (id, title, description, content, "coverImage", images, type, "createdAt", "updatedAt") FROM stdin;
893b964a-9c90-4851-8161-3023ec3168f9	Mirik 	A Test archive going on 	our story revolving around how local design will help and grow many projects 	https://res.cloudinary.com/dc66jjufy/image/upload/v1765429271/design-archives-submissions/Screenshot_2025_12_10_124339_1765429265103.png	{https://res.cloudinary.com/dc66jjufy/image/upload/v1765429223/design-archives-submissions/Screenshot__96__1765429217894.png,https://res.cloudinary.com/dc66jjufy/image/upload/v1765429312/design-archives-submissions/Screenshot_2025_12_04_171911_1765429306001.png}	story	2025-12-11 05:13:07.011	2025-12-11 05:13:07.011
3b3098f7-86a8-42f8-baa0-cbb7d2827c09	JAGDISH	Location: West Bengal. A deep dive into the traditional pottery techniques of Jagdish, preserving centuries-old methods of clay molding and firing.	Jagdish represents a lineage of potters who have maintained the integrity of their craft despite modern industrial pressures. This archive documents their daily routines, the specific clay mixtures they use, and the cultural significance of their wares in local festivals. The collection includes video interviews, detailed photographs of the firing process, and a catalog of traditional forms.	https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80	{https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80,https://images.unsplash.com/photo-1459749411177-3c269fae8e6e?w=800&q=80,https://images.unsplash.com/photo-1505569127510-bde15360d7bf?w=800&q=80}	Crafts	2025-12-11 05:30:40.984	2025-12-11 05:30:40.984
91b33e35-7ba3-4a8c-84f4-db00df5d0b99	RABI - PLASSEY	Location: Plassey. Documenting the architectural innovations in Plassey, where local materials meet modern needs in sustainable housing.	In the rural plains of Plassey, a quiet revolution in sustainable architecture is taking place. This archive explores how local builders are adapting traditional bamboo and mud construction techniques to create climate-resilient homes. Through detailed blueprints and interviews with master builders, we uncover the ingenuity behind these low-cost, high-impact structures.	https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&q=80	{https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=800&q=80,https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&q=80,https://images.unsplash.com/photo-1438786657495-640937046d18?w=800&q=80}	Innovations	2025-12-11 05:30:41.569	2025-12-11 05:30:41.569
645b8f74-37aa-49e6-bf4a-fd2cb1a7d73b	RABI - SUNDARBAN	Location: Sundarbans. Life on the water: Capturing the oral histories and boat-building traditions of the Sundarbans delta.	The Sundarbans, a vast network of mangrove forests and waterways, is home to a unique boat-building culture. This archive preserves the oral histories of the boatmen and the intricate craftsmanship involved in constructing vessels that can withstand the tidal shifts. It serves as a testament to human adaptation and the symbiotic relationship with nature.	https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&q=80	{https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&q=80,https://images.unsplash.com/photo-1504701954957-2010ec3bbed1?w=800&q=80,https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80}	Stories	2025-12-11 05:30:41.859	2025-12-11 05:30:41.859
75768729-5c25-49d6-9fde-70fd342cbd2b	TERRACOTTA TALES	Location: Bishnupur. Exploring the intricate terracotta temples of Bishnupur and the artisans who keep the restoration skills alive.	Bishnupur is famous for its terracotta temples, but the skills required to maintain them are fading. This archive focuses on the few remaining artisan families who possess the knowledge of creating these intricate clay tiles. It documents their tools, their firing kilns, and the mythological stories depicted in their art.	https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80	{https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&q=80,https://images.unsplash.com/photo-1523554888454-84137e72d3ce?w=800&q=80,https://images.unsplash.com/photo-1516961642265-531546e84af2?w=800&q=80}	Crafts	2025-12-11 05:30:42.151	2025-12-11 05:30:42.151
062012b8-e317-421c-aba0-43c0f7eb22c6	WEAVERS OF PHULIA	Location: Phulia. The rhythm of the loom: A look at the handloom heritage of Phulia and its evolution in contemporary fashion.	Phulia is synonymous with fine cotton sarees. This archive traces the journey of the thread from spinning to weaving. It highlights the mathematical precision of the Jacquard looms and the creative adaptations weavers are making to stay relevant in a global market. Includes interviews with master weavers and a catalog of traditional motifs.	https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80	{https://images.unsplash.com/photo-1523676060187-f55189a71f5e?w=800&q=80,https://images.unsplash.com/photo-1518640165980-d3e0e2aa6c1e?w=800&q=80,https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=800&q=80}	Crafts	2025-12-11 05:30:42.439	2025-12-11 05:30:42.439
62592ec3-aa31-48ed-9b61-9329f2be2459	BAMBOO STRUCTURES	Location: North East. Sustainable engineering: How bamboo is being used to create earthquake-resistant structures in the North East.	In the seismic zones of North East India, bamboo is more than a plant; it is a lifeline. This archive documents the engineering properties of bamboo and how it is treated and joined to create flexible, strong structures. It showcases bridges, homes, and community halls that exemplify sustainable indigenous engineering.	https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=800&q=80	{https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80,https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80,https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&q=80}	Innovations	2025-12-11 05:30:42.729	2025-12-11 05:30:42.729
\.


--
-- Data for Name: Challenge; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Challenge" (id, title, description, "shortDescription", status, category, organizer, "prizePool", currency, "totalParticipants", "totalViews", "totalSubmissions", "startDate", "endDate", "imageUrl", difficulty, tags, location, overview, rules, assets, "createdAt", "updatedAt", type) FROM stdin;
b976450f-8051-4a58-b029-c46f8c7b8527	Test Challenge Full Data	This is a test challenge with all fields populated to verify the admin form structure.	Testing full data submission	upcoming	{UI/UX,"Web Design"}	Test Organizer	10000	INR	1	1	0	2025-01-01	2025-02-01	https://example.com/image.jpg	Beginner	{test,verification}	\N	{"brief": "This is the brief.", "criteria": [{"title": "Criterion 1", "weight": 50, "description": "Desc 1"}, {"title": "Criterion 2", "weight": 50, "description": "Desc 2"}], "schedule": [{"date": "Jan 1", "phase": "Phase 1"}, {"date": "Feb 1", "phase": "Phase 2"}], "deliverables": ["Deliverable 1", "Deliverable 2"]}	{"Rule 1","Rule 2"}	{"{\\"url\\": \\"http://example.com/1.pdf\\", \\"name\\": \\"Asset 1\\", \\"size\\": \\"1MB\\", \\"type\\": \\"pdf\\"}"}	2025-12-02 03:14:57.578	2025-12-09 04:13:04.985	standard
3e5b75b4-e4f7-4ef5-81f7-5c907742ea22	Futuristic UI Dashboard	Design a futuristic user interface for a space exploration dashboard. Think holograms, dark mode, and data visualization.	Create a UI for a space exploration dashboard.	upcoming	{UI/UX,"Web Design"}	TechNova	1000	USD	1	2	0	2025-02-01	2025-02-28	https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop	Advanced	{ui,dashboard,futuristic}	\N	{"brief": "Design a dashboard that helps astronauts monitor ship systems and navigation.", "criteria": ["Usability", "Aesthetics", "Innovation"], "schedule": [{"date": "2025-02-01 - 2025-02-28", "phase": "Submission"}, {"date": "", "phase": "", "objectives": [], "deliverables": []}], "deliverables": ["Dashboard Screen", "Navigation Menu", "System Status Widgets"]}	{"Must include dark mode","Figma or Sketch files required"}	{"{\\"url\\": \\"\\", \\"name\\": \\"\\", \\"size\\": \\"\\", \\"type\\": \\"pdf\\"}"}	2025-12-02 02:57:46.629	2025-12-10 16:44:46.633	standard
31d70039-c2e8-4ed8-a2bb-294801cf215b	Standard Challenge	This is a standard challenge.	Standard	active	{"Web Design"}	Studio 1947	1000	USD	0	0	0	2025-01-01	2025-02-01	https://example.com/standard.jpg	Intermediate	{standard}	\N	{"brief": "Brief", "criteria": [], "schedule": [], "deliverables": []}	{}	{}	2025-12-02 04:03:25.324	2025-12-02 04:03:25.324	standard
d8779a11-6955-47dc-8c0f-5c450d85d997	Student Challenge	This is a student challenge.	Student	active	{UI/UX}	University	500	USD	1	2	0	2025-01-01	2025-02-01	https://res.cloudinary.com/dc66jjufy/image/upload/v1764730265/design-archives-submissions/eo7hqvo26zjciwxwzrcb.png	Beginner	{student}	\N	{"brief": "Brief", "criteria": [], "schedule": [], "deliverables": []}	{}	{}	2025-12-02 04:03:26.517	2025-12-09 10:43:46.612	student
321038f5-ad5d-44c6-8df1-2cae80349607	Vintage Poster Design	Create a vintage-style travel poster for a fictional city. Use retro typography and textures to capture the nostalgia of the 1950s.	Design a vintage travel poster.	archived	{Illustration,"Print Design"}	RetroArt	300	USD	0	1	0	2024-11-01	2024-11-30	https://images.unsplash.com/photo-1572061489735-485f9f21d7e0?q=80&w=2574&auto=format&fit=crop	Beginner	{vintage,poster,illustration}	\N	{"brief": "Capture the essence of a fictional city in a retro style.", "criteria": ["Style adherence", "Creativity"], "schedule": [], "deliverables": ["Poster Design"]}	{"Use only provided color palette"}	{}	2025-12-02 02:57:46.992	2025-12-09 04:09:20.912	standard
7962e740-574b-440c-898b-9efa31a28074	Minimalist Brand Identity	Create a minimalist brand identity for a sustainable coffee shop. Focus on clean lines, earthy tones, and a modern aesthetic that reflects the brand's commitment to the environment.	Design a brand identity for a sustainable coffee shop.	active	{Branding,"Logo Design"}	Studio 1947	500	USD	1	8	0	2025-01-01	2025-01-15	https://res.cloudinary.com/dc66jjufy/image/upload/v1764675922/design-archives-submissions/tncd0vskrdwnsz65wf2t.png	Intermediate	{branding,minimalism,coffee}	\N	{"brief": "The goal is to create a cohesive brand identity that appeals to eco-conscious consumers.", "criteria": ["Originality", "Relevance", "Execution"], "schedule": [{"date": "2025-01-01 - 2025-01-15", "phase": "Submission"}, {"date": "2025-01-16 - 2025-01-20", "phase": "Judging"}, {"date": "2025-01-21", "phase": "Winners Announced"}], "deliverables": ["Logo", "Color Palette", "Typography", "Packaging Mockup"]}	{"Original work only","No AI generated content","Submit in PDF format"}	{"{\\"url\\": \\"https://example.com/template.pdf\\", \\"name\\": \\"Brand Guidelines Template\\"}"}	2025-12-02 02:57:45.29	2025-12-11 02:41:32.149	standard
a0e4e9e6-b8e3-4bac-8af3-f84cbbd0a237	again test-2	full des about test-2 again	test 2 	upcoming	{UI,UX}	Studio 1947	1998	INR	2	2	0	2025-12-02	2025-12-06	https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg	Beginner	{Branding,logos,ui}		{"brief": "We re properly testing this student challenge publications", "criteria": [], "schedule": [{"date": "04/12/25", "phase": "Phase -1", "objectives": ["desing ideas and drafting"], "deliverables": ["desing ideas and drafting"]}, {"date": "05/12/25", "phase": "Phase -2", "objectives": ["proper files uploading"], "deliverables": ["desing ideas and drafting"]}], "deliverables": ["blue"]}	{"no ai works if found a proper dispilinary advised will be taken "}	{}	2025-12-02 04:25:37.363	2025-12-09 10:44:36.924	student
f849c730-eaaf-42df-98b0-7be6443da618	Hiring Poster Illustration 	We are looking for a strong visual poster that communicates our call for interns under Himāl Nagarik.\nThe roles include Data Intern, Web Intern, and Graphic Design Intern.\nYour task is to design a poster that feels bold, youth-driven, and aligned with the colour and style of 1947 Studio.\nUse clear typography, strong layout, and simple messaging. The poster should be suitable for social media and print (A4).	Create a hiring poster for Himāl Nagarik to recruit interns in data, web development, and graphic design.	active	{"Digital Illustration",Poster,A4}	Studio 1947	1000	INR	0	7	0	2025-12-04	2025-12-31	https://res.cloudinary.com/dc66jjufy/image/upload/v1764843589/design-archives-submissions/Screenshot_2025_12_04_154924_1764843589190.png	Beginner	{Poster,Digitalillustrations,Hiringposter,A4,Internshipdesign}		{"brief": "Design a hiring poster for Himāl Nagarik calling for interns in three roles, Data, Web and Graphic Design.\\nThe focus is clarity, clean layout, and a youthful energy that reflects learning, responsibility, and local community leadership.\\nStick to the red and white colour theme from 1947.io.", "criteria": [{"title": "Clarity of Message", "weight": 40, "description": "Poster communicates the hiring call clearly and attractively."}, {"title": "Visual Quality", "weight": 40, "description": "Layout, typography, colours, and overall aesthetic."}, {"title": "Originality", "weight": 20, "description": "Freshness of idea and unique style without using AI artwork."}], "schedule": [{"date": "23/12/25", "phase": "Phase 1", "objectives": [], "deliverables": ["Rough sketches or outline of your poster concept."]}, {"date": "31/12/25", "phase": "phase 2 ", "objectives": [], "deliverables": ["Submit the final creative."]}], "deliverables": ["Final poster in A4 size (PNG/JPG)", "Editable source file (AI/PSD)", "Colour theme must follow 1947.io", "One-line description of your concept"]}	{"No AI-generated artwork.","Only original work created by the participant.","Use the Himāl Nagarik and Studio 1947 colour theme."}	{}	2025-12-04 10:36:20.482	2025-12-09 04:20:56.64	standard
5983269c-0485-4fbf-9d4e-9ddb2a2248db	Minimalist Brand Identity	Create a minimalist brand identity for a sustainable coffee shop. Focus on clean lines, earthy tones, and a modern aesthetic that reflects the brand's commitment to the environment.	Design a brand identity for a sustainable coffee shop.	active	{Branding,"Logo Design"}	Studio 1947	500	USD	0	0	0	2025-01-01	2025-01-15	https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop	Intermediate	{branding,minimalism,coffee}	\N	{"brief": "The goal is to create a cohesive brand identity that appeals to eco-conscious consumers.", "criteria": ["Originality", "Relevance", "Execution"], "schedule": [{"date": "2025-01-01 - 2025-01-15", "phase": "Submission"}, {"date": "2025-01-16 - 2025-01-20", "phase": "Judging"}, {"date": "2025-01-21", "phase": "Winners Announced"}], "deliverables": ["Logo", "Color Palette", "Typography", "Packaging Mockup"]}	{"Original work only","No AI generated content","Submit in PDF format"}	{"{\\"url\\": \\"https://example.com/template.pdf\\", \\"name\\": \\"Brand Guidelines Template\\"}"}	2025-12-11 05:30:39.817	2025-12-11 05:30:39.817	standard
711808d7-0ab7-423b-b501-db2c777237b9	Futuristic UI Dashboard	Design a futuristic user interface for a space exploration dashboard. Think holograms, dark mode, and data visualization.	Create a UI for a space exploration dashboard.	upcoming	{UI/UX,"Web Design"}	TechNova	1000	USD	0	0	0	2025-02-01	2025-02-28	https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop	Advanced	{ui,dashboard,futuristic}	\N	{"brief": "Design a dashboard that helps astronauts monitor ship systems and navigation.", "criteria": ["Usability", "Aesthetics", "Innovation"], "schedule": [{"date": "2025-02-01 - 2025-02-28", "phase": "Submission"}], "deliverables": ["Dashboard Screen", "Navigation Menu", "System Status Widgets"]}	{"Must include dark mode","Figma or Sketch files required"}	{}	2025-12-11 05:30:40.405	2025-12-11 05:30:40.405	standard
07099784-00a5-4a67-a593-e5548c156f08	Vintage Poster Design	Create a vintage-style travel poster for a fictional city. Use retro typography and textures to capture the nostalgia of the 1950s.	Design a vintage travel poster.	archived	{Illustration,"Print Design"}	RetroArt	300	USD	0	0	0	2024-11-01	2024-11-30	https://images.unsplash.com/photo-1572061489735-485f9f21d7e0?q=80&w=2574&auto=format&fit=crop	Beginner	{vintage,poster,illustration}	\N	{"brief": "Capture the essence of a fictional city in a retro style.", "criteria": ["Style adherence", "Creativity"], "schedule": [], "deliverables": ["Poster Design"]}	{"Use only provided color palette"}	{}	2025-12-11 05:30:40.695	2025-12-11 05:30:40.695	standard
\.


--
-- Data for Name: ChallengeView; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."ChallengeView" (id, "challengeId", "userId", "ipAddress", "createdAt") FROM stdin;
ecec9651-a4bc-4d8e-9b43-aff5c3dc3551	321038f5-ad5d-44c6-8df1-2cae80349607	\N	::1	2025-12-09 04:09:19.892
3a998ed0-ae63-4cf8-8f48-82575a4d14c9	d8779a11-6955-47dc-8c0f-5c450d85d997	d2e05cdc-6c76-423c-9579-ce1e2879e389	::1	2025-12-09 04:12:20.115
e0cdd42a-5311-4210-8ca3-349c0df7eb72	b976450f-8051-4a58-b029-c46f8c7b8527	d2e05cdc-6c76-423c-9579-ce1e2879e389	::1	2025-12-09 04:12:56.231
84b23ce8-f0cc-4a47-8174-692b18c94db8	3e5b75b4-e4f7-4ef5-81f7-5c907742ea22	d2e05cdc-6c76-423c-9579-ce1e2879e389	::1	2025-12-09 04:13:41.893
a5d1f7fc-2625-4ebb-86d6-92e94e1cf320	7962e740-574b-440c-898b-9efa31a28074	645ff72d-1dfa-440a-b8f0-a4e5c5b43c4e	::1	2025-12-09 04:14:51.739
4e79b895-e39f-4364-bcd5-3ef2bd0856be	f849c730-eaaf-42df-98b0-7be6443da618	645ff72d-1dfa-440a-b8f0-a4e5c5b43c4e	::1	2025-12-09 04:20:56.152
b4424aa9-013f-45d7-86eb-444f40d41d32	a0e4e9e6-b8e3-4bac-8af3-f84cbbd0a237	645ff72d-1dfa-440a-b8f0-a4e5c5b43c4e	::1	2025-12-09 04:33:39.298
2dcb15b1-3a7d-43e7-af53-c348168b8d0f	d8779a11-6955-47dc-8c0f-5c450d85d997	9db054a6-1989-4b86-8db0-d2b49cf4f1a1	\N	2025-12-09 10:43:31.261
be29d637-0c39-4f43-b824-50242f4ad04b	a0e4e9e6-b8e3-4bac-8af3-f84cbbd0a237	9db054a6-1989-4b86-8db0-d2b49cf4f1a1	\N	2025-12-09 10:44:34.522
2dc51cd2-6454-42f5-81af-7dad0bb06a26	7962e740-574b-440c-898b-9efa31a28074	d2e05cdc-6c76-423c-9579-ce1e2879e389	\N	2025-12-10 09:57:52.677
\.


--
-- Data for Name: ContactSubmission; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."ContactSubmission" (id, name, email, subject, message, status, "createdAt", "updatedAt") FROM stdin;
d83a8503-f0c5-474b-bd04-631118510b42	Soumic	soumicsarkar@gmail.com	Challenges	Hi iam soumic sarkar i want to host a challenge .	new	2025-12-11 06:35:25.428	2025-12-11 06:35:25.428
a2139f85-ae60-4124-997d-fc4a04fa180c	Debarpan	dev@gmail.com	General Inquiry	What it is a	new	2025-12-11 06:41:11.448	2025-12-11 06:41:11.448
\.


--
-- Data for Name: Participant; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Participant" (id, "userId", "challengeId", status, "joinedAt") FROM stdin;
a66ebd95-e8d2-47f5-8f92-e40dc72968e0	645ff72d-1dfa-440a-b8f0-a4e5c5b43c4e	31d70039-c2e8-4ed8-a2bb-294801cf215b	registered	2025-12-02 05:29:02.965
e2fb51e0-3bae-4973-8c0f-ec1ba22e7031	645ff72d-1dfa-440a-b8f0-a4e5c5b43c4e	3e5b75b4-e4f7-4ef5-81f7-5c907742ea22	registered	2025-12-02 05:29:57.011
c36ca808-ae4b-4858-baca-9fefdbbe01a3	645ff72d-1dfa-440a-b8f0-a4e5c5b43c4e	7962e740-574b-440c-898b-9efa31a28074	registered	2025-12-02 11:36:00.126
4cda3892-c627-488f-93bf-23cb8eb1ada3	645ff72d-1dfa-440a-b8f0-a4e5c5b43c4e	d8779a11-6955-47dc-8c0f-5c450d85d997	registered	2025-12-03 11:20:56.186
d34bb5b2-c580-411a-937d-16ff7993eccf	d2e05cdc-6c76-423c-9579-ce1e2879e389	d8779a11-6955-47dc-8c0f-5c450d85d997	registered	2025-12-03 11:22:14.989
1cd7c20d-71e2-4cfa-8576-564e8aac9932	a43f7d7b-7728-4df9-aee6-f5bb938b2cdd	f849c730-eaaf-42df-98b0-7be6443da618	registered	2025-12-04 10:42:11.429
f55e5543-24bc-4daa-b5fc-45e64ae3d610	a43f7d7b-7728-4df9-aee6-f5bb938b2cdd	3e5b75b4-e4f7-4ef5-81f7-5c907742ea22	registered	2025-12-04 10:42:44.396
911906bf-12ca-416a-9ebd-54a323d9206d	a43f7d7b-7728-4df9-aee6-f5bb938b2cdd	31d70039-c2e8-4ed8-a2bb-294801cf215b	registered	2025-12-04 10:44:11.59
a26d2aef-f56b-4831-a915-9ee39184be48	645ff72d-1dfa-440a-b8f0-a4e5c5b43c4e	f849c730-eaaf-42df-98b0-7be6443da618	registered	2025-12-08 05:44:11.62
ad4daddb-e3a0-49d7-ae03-c9dfb9419e15	d2e05cdc-6c76-423c-9579-ce1e2879e389	a0e4e9e6-b8e3-4bac-8af3-f84cbbd0a237	registered	2025-12-09 03:54:23.516
67546f61-69a7-4c0e-a515-cd9033e7857a	d2e05cdc-6c76-423c-9579-ce1e2879e389	b976450f-8051-4a58-b029-c46f8c7b8527	registered	2025-12-09 04:13:04.415
aac22b34-1efb-4adc-94b2-e092103e5f9a	d2e05cdc-6c76-423c-9579-ce1e2879e389	3e5b75b4-e4f7-4ef5-81f7-5c907742ea22	registered	2025-12-09 04:13:49.11
7d433e8b-4531-4c19-a9f6-5ed9c8839ef9	9db054a6-1989-4b86-8db0-d2b49cf4f1a1	d8779a11-6955-47dc-8c0f-5c450d85d997	registered	2025-12-09 10:43:46.582
a56ba538-74d4-4773-9fb9-50b9afa5c3a2	9db054a6-1989-4b86-8db0-d2b49cf4f1a1	a0e4e9e6-b8e3-4bac-8af3-f84cbbd0a237	registered	2025-12-09 10:44:36.91
558681f0-4f52-4901-8f97-abd4aa75aa5e	d2e05cdc-6c76-423c-9579-ce1e2879e389	7962e740-574b-440c-898b-9efa31a28074	registered	2025-12-10 09:57:56.476
\.


--
-- Data for Name: Submission; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Submission" (id, "challengeId", "userId", creativity, technical, adherence, "totalScore", "fileUrl", description, "createdAt", "updatedAt", status) FROM stdin;
0de59f2e-3bc2-472a-a37f-06f63ffb3381	d8779a11-6955-47dc-8c0f-5c450d85d997	d2e05cdc-6c76-423c-9579-ce1e2879e389	50	50	50	50	https://res.cloudinary.com/dc66jjufy/image/upload/v1764762872/design-archives-submissions/y4b9b0sj00xtcdofhbt4.jpg	my submissions	2025-12-03 11:54:48.865	2025-12-03 11:58:18.738	graded
588dc30d-bcd6-43da-a017-c636db2bbb16	d8779a11-6955-47dc-8c0f-5c450d85d997	d2e05cdc-6c76-423c-9579-ce1e2879e389	80	90	10	60	https://res.cloudinary.com/dc66jjufy/image/upload/v1764821071/design-archives-submissions/xp8jswdlzanl5lxxroxb.pdf		2025-12-04 04:04:33.689	2025-12-04 04:07:05.366	graded
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."User" (id, email, password, name, picture, "createdAt", "updatedAt", role, "welcomeEmailSent") FROM stdin;
645ff72d-1dfa-440a-b8f0-a4e5c5b43c4e	admin@studio1947.com	$2b$10$6vrZ1qFcCHVOa9pqfDKgN.dkyO6MLLB2aYhoGjD3Mc9jfrvAl2FU6	Admin	https://ui-avatars.com/api/?name=Admin&background=random	2025-12-01 11:42:32.487	2025-12-09 06:29:57.93	admin	t
393c1a79-cacd-42e0-8388-7b2b2f176bf4	uiux1947@gmail.com	\N	Studio 1947	https://lh3.googleusercontent.com/a/ACg8ocLIJelQKFG1d9AbgtIo2IDF4DFavnciAFAdjevJDgch55YYOQ=s96-c	2025-12-03 04:32:44.048	2025-12-09 06:30:01.377	user	t
d2e05cdc-6c76-423c-9579-ce1e2879e389	localdesigncommunity@gmail.com	\N	Local design community	https://lh3.googleusercontent.com/a/ACg8ocKoncpptD_ep8PPQI1NE39RDM2Hig-fx13IU8Wl0uCs7XD3KA=s96-c	2025-12-03 04:38:57.929	2025-12-09 06:30:04.495	user	t
a43f7d7b-7728-4df9-aee6-f5bb938b2cdd	santtamk@gmail.com	\N	Santam K	https://lh3.googleusercontent.com/a/ACg8ocI6HdHgtmFIRlI4Ha2GiUDkb-v4HPecBOX0kBFaxZ0FcyfxI0hp=s96-c	2025-12-04 10:41:38.952	2025-12-09 06:30:07.659	user	t
02068ed2-e41f-4d78-97fd-2e91ced3f1d9	soumicsarkar@gmail.com	\N	soumic 1088	https://lh3.googleusercontent.com/a/ACg8ocIIdzx-q2T3_Oo4KLZliubrqQ1t0sgXebzabxYV8RP3olzqOkQt=s96-c	2025-12-08 06:11:59.662	2025-12-09 06:30:11.415	user	t
9db054a6-1989-4b86-8db0-d2b49cf4f1a1	levi83447@gmail.com	\N	levi	https://lh3.googleusercontent.com/a/ACg8ocJWKC1WJlyjWYwukSWShYbWCVZLXf07lgSx_kF0-CeWQrB1Ew=s96-c	2025-12-09 10:43:22.151	2025-12-09 10:43:22.151	user	t
\.


--
-- Data for Name: WorkshopApplication; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."WorkshopApplication" (id, name, email, phone, statement, status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
dfc4319b-b31c-480c-890f-51d44b158c65	03f84abd736be02eb173260bd5dfb1b857c00b193a8fd19297114698fefe8c35	2025-12-01 11:17:00.807092+00	20251201111657_new_db	\N	\N	2025-12-01 11:16:58.942906+00	1
\.


--
-- Name: Archive Archive_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Archive"
    ADD CONSTRAINT "Archive_pkey" PRIMARY KEY (id);


--
-- Name: ChallengeView ChallengeView_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ChallengeView"
    ADD CONSTRAINT "ChallengeView_pkey" PRIMARY KEY (id);


--
-- Name: Challenge Challenge_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Challenge"
    ADD CONSTRAINT "Challenge_pkey" PRIMARY KEY (id);


--
-- Name: ContactSubmission ContactSubmission_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ContactSubmission"
    ADD CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY (id);


--
-- Name: Participant Participant_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Participant"
    ADD CONSTRAINT "Participant_pkey" PRIMARY KEY (id);


--
-- Name: Submission Submission_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Submission"
    ADD CONSTRAINT "Submission_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: WorkshopApplication WorkshopApplication_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."WorkshopApplication"
    ADD CONSTRAINT "WorkshopApplication_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: ChallengeView_challengeId_userId_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "ChallengeView_challengeId_userId_key" ON public."ChallengeView" USING btree ("challengeId", "userId");


--
-- Name: Participant_userId_challengeId_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "Participant_userId_challengeId_key" ON public."Participant" USING btree ("userId", "challengeId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: ChallengeView ChallengeView_challengeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ChallengeView"
    ADD CONSTRAINT "ChallengeView_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES public."Challenge"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ChallengeView ChallengeView_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ChallengeView"
    ADD CONSTRAINT "ChallengeView_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Participant Participant_challengeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Participant"
    ADD CONSTRAINT "Participant_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES public."Challenge"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Participant Participant_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Participant"
    ADD CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Submission Submission_challengeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Submission"
    ADD CONSTRAINT "Submission_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES public."Challenge"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Submission Submission_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Submission"
    ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

