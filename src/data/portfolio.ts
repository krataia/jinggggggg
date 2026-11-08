// All site copy lives here. Replace the bracketed placeholders with real
// content — the layout is designed around them, not hard-coded to them.

export interface Project {
	number: string;
	name: string;
	year: string;
	description: string;
	stack: string;
	role: string;
	clip: string;
	links: Record<string, string>; // label -> href, rendered in order
}

export const github = 'https://github.com/krataia';

export const site = {
	handle: 'krataia',
	name: 'Kittipong Moodjan',
	contact: [{ label: 'github.com/krataia', href: github }],
	year: '2026',

	title: 'krataia — portfolio',
	description:
		'I build systems, take them apart, and write down what I find.',

	nav: [
		{ label: 'work', href: '#work' },
		{ label: 'about', href: '#about' },
		{ label: 'contact', href: '#contact' },
	],
};

export const hero = {
	prompt: 'hello',
	lines: ['I build systems, take them apart,', 'and write down what I find.'],
	closing: 'Below is the work.',
	remark: 'Not everything here is visible at first glance.',
};

export const manifesto = {
	questions: [
		'What are we building?',
		'For whom does it run?',
		'What remains when the power goes out?',
	],
	statement: 'We do not answer. We leave the work.',
	cipher: 'WKH ZRUN LV WKH RQOB HYLGHQFH',
	note: 'unsigned / undated',
};

export const about = {
	body: 'Student working toward offensive security. I compete in CTFs (Thailand Cyber Talent 2025, NCSA AI CTF 2026), collect certifications to fill the gaps, and build small tools in TypeScript and Rust on the side.',
};

// Files live in public/ผลงาน/; encodeURI handles the Thai folder name and spaces.
const file = (name: string) => encodeURI(`/ผลงาน/${name}`);

const work = (
	number: string,
	name: string,
	year: string,
	description: string,
	stack: string,
	role: string,
	clip: string,
): Project => ({
	number,
	name,
	year,
	description,
	stack,
	role,
	clip,
	links: { certificate: file(clip) },
});

export const projects: Project[] = [
	work('01', 'HanumanStrike Certified Foundation (HSCF)', '2026', 'Passed all examination requirements for the HanumanStrike foundation certification. Valid until 22 September 2029.', 'offensive security', 'candidate', 'ec257953e713714c.pdf'),
	work('02', 'Thailand Cyber Top Talent 2026', '2026', 'Competed in the NCSA CTF Thailand Tournament 2026 — Thailand Cyber Top Talent, 15 August 2026, as team Kimi K3.', 'ctf', 'team member', 'ee23cba66482ac46.pdf'),
	work('03', 'Networking Basics', '2026', 'Cisco Networking Academy: network types, Ethernet, IPv4/IPv6 addressing, routing, and troubleshooting connectivity.', 'networking', 'student', '9ba20b6877a7af2f.pdf'),
	work('04', 'Data Science Essentials with Python', '2026', 'Cisco Networking Academy course on data analysis with Python.', 'python / data', 'student', 'b3883ade6c1177c4.pdf'),
	work('05', 'Basic Cybersecurity', '2026', 'NCSA MOOC cybersecurity learning platform — certificate of completion (ID SPG-06FZCTLYGCI6I).', 'cybersecurity', 'student', 'f753e673b8ee1d92.pdf'),
	work('06', 'NCSA AI CTF 2026', '2026', 'Competed in the NCSA CTF Thailand Tournament 2026 — AI CTF track, 28 March 2026.', 'ctf / ai security', 'participant', 'f64961133a9bfd4c.pdf'),
	work('07', 'Thailand Cyber Talent 2025', '2025', 'Certificate of appreciation from the National Cyber Security Agency for competing in Thailand Cyber Talent 2025 as team แมวเย็นแมวเหมียว.', 'ctf', 'team member', '4220dd866d6f9638.png'),
];
