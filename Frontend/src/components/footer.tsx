const Footer = () => (
  <footer className="w-full bg-slate-900 text-slate-200 py-8 mt-auto border-t border-slate-800">
    <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 px-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-bold tracking-wide text-app-accent">
          My Template
        </span>
        <span className="text-xs text-slate-400">
          © {new Date().getFullYear()} William Leander Jensen. All rights
          reserved.
        </span>
      </div>
      <div className="flex gap-6 mt-2">
        <a
          href="https://github.com/willy0483"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-app-accent transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.578.688.48C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z" />
          </svg>
        </a>
        <a
          href="https://twitter.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="hover:text-app-accent transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.488 0-4.505 2.017-4.505 4.505 0 .353.04.697.117 1.027C7.728 9.37 4.1 7.555 1.67 4.905c-.388.666-.61 1.44-.61 2.267 0 1.563.796 2.942 2.008 3.75-.74-.023-1.436-.227-2.045-.567v.057c0 2.185 1.555 4.008 3.623 4.425-.378.104-.777.16-1.188.16-.29 0-.57-.028-.844-.08.57 1.78 2.223 3.075 4.183 3.11A9.01 9.01 0 0 1 2 19.54a12.73 12.73 0 0 0 6.88 2.017c8.253 0 12.774-6.837 12.774-12.774 0-.195-.004-.39-.013-.583A9.14 9.14 0 0 0 24 4.59a8.93 8.93 0 0 1-2.54.697z" />
          </svg>
        </a>
        <a
          href="mailto:william@example.com"
          aria-label="Email"
          className="hover:text-app-accent transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15A2.25 2.25 0 0 1 2.25 17.25V6.75zm1.5 0v.638l8.25 5.512 8.25-5.512V6.75a.75.75 0 0 0-.75-.75h-15a.75.75 0 0 0-.75.75zm16.5 1.862-7.728 5.167a1.5 1.5 0 0 1-1.544 0L3.75 8.612v8.638a.75.75 0 0 0 .75.75h15a.75.75 0 0 0 .75-.75V8.612z" />
          </svg>
        </a>
      </div>
      <div className="text-xs text-slate-400 mt-4">
        Built by <span> </span>
        <a
          href="https://github.com/willy0483"
          className="underline hover:text-app-accent"
          target="_blank"
          rel="noopener noreferrer"
        >
          William Leander Jensen
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
