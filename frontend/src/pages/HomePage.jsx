import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Kanban,
  MessageSquare,
  Sparkles,
  Users2,
} from "lucide-react";
import { Button } from "../components/Button";
import { useSelector } from "react-redux";

const features = [
  {
    icon: Kanban,
    title: "Project boards",
    description:
      "Break work into projects, milestones and tasks your team can see at a glance.",
  },
  {
    icon: Users2,
    title: "Teams, not just tasks",
    description:
      "Invite teammates, assign owners, and keep everyone accountable in one place.",
  },
  {
    icon: MessageSquare,
    title: "Built-in discussion",
    description:
      "Keep project conversations next to the work itself, not scattered in chat.",
  },
  {
    icon: Sparkles,
    title: "Real-time insight",
    description:
      "Live dashboards and charts show status, priority and progress as it happens.",
  },
];

const logos = ["Nimbus", "Orbitly", "Fluxwave", "Cobalt", "Hearth"];

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-surface font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-slate-200/70">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <Boxes className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              RemoteSync
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">
                    Get started
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/dashboard">
                <Button size="sm">
                  Go to dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <div className="absolute top-[-120px] right-[-80px] w-[420px] h-[420px] rounded-full bg-primary-200/40 blur-3xl -z-10" />
        <div className="absolute top-[80px] left-[-120px] w-[360px] h-[360px] rounded-full bg-primary-300/30 blur-3xl -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-medium px-3 py-1.5 ring-1 ring-inset ring-primary-200 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Built for distributed teams
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]"
          >
            Run your remote team&rsquo;s <br className="hidden sm:block" />
            <span className="text-primary-600">work in one place</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-5 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto"
          >
            RemoteSync brings projects, tasks, teams and conversations together
            so distributed teams can plan, ship and track progress without the
            tool-hopping.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link to={user ? "/dashboard" : "/signup"} className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                {user ? "Go to dashboard" : "Start for free"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            {!user && (
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Log in
                </Button>
              </Link>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-16 mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-pop)] overflow-hidden"
          >
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 bg-slate-50">
              <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
            </div>
            <img
              src="https://static.nomensa.com/collaboration_eb16f9b754.jpg"
              alt="Team collaborating on a project dashboard"
              className="w-full h-64 sm:h-96 object-cover"
            />
          </motion.div>

          <p className="mt-14 text-xs font-medium uppercase tracking-wider text-slate-400">
            Trusted by teams at
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-slate-400 font-display font-semibold text-lg">
            {logos.map((logo) => (
              <span key={logo}>{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            Everything a project needs, nothing it doesn&rsquo;t
          </h2>
          <p className="mt-3 text-slate-500">
            Purpose-built for how remote teams actually work together.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-[var(--shadow-pop)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-slate-900">{feature.title}</h3>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Value strip */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="rounded-3xl bg-primary-950 relative overflow-hidden px-6 sm:px-14 py-14 sm:py-16 text-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-primary-700/30 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-primary-500/20 blur-3xl" />

          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Ready to bring your team together?
            </h2>
            <p className="mt-3 text-primary-100/80 max-w-xl mx-auto">
              Set up your first project in minutes — free while your team is
              small.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to={user ? "/dashboard" : "/signup"}>
                <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                  {user ? "Go to dashboard" : "Create your workspace"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-primary-100/70 text-sm">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Free for small teams
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
              <Boxes className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-semibold text-slate-700">
              RemoteSync
            </span>
          </div>
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} RemoteSync. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
