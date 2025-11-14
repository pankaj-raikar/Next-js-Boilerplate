'use client';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useSidebar } from '@/context/SidebarContext';
import {
  BoxCubeIcon,
  CalenderIcon,
  GridIcon,
  MailIcon,
  PieChartIcon,
  PlugInIcon,
  TaskIcon,
} from '@/icons';

type SimpleNavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type ProjectItem = {
  label: string;
  colorClass: string;
};

const primaryNavItems: SimpleNavItem[] = [
  { label: 'Home', href: '/dashboard2', icon: <GridIcon /> },
  { label: 'Prodify AI', href: '/dashboard2/profile', icon: <PlugInIcon /> },
  { label: 'My tasks', href: '/dashboard2/form-elements', icon: <TaskIcon /> },
  { label: 'Inbox', href: '/dashboard2/alerts', icon: <MailIcon /> },
  { label: 'Calendar', href: '/dashboard2/calendar', icon: <CalenderIcon /> },
  {
    label: 'Reports & Analytics',
    href: '/dashboard2/bar-chart',
    icon: <PieChartIcon />,
  },
];

const projectItems: ProjectItem[] = [
  { label: 'Product launch', colorClass: 'bg-fuchsia-500' },
  { label: 'Team brainstorm', colorClass: 'bg-sky-500' },
  { label: 'Branding launch', colorClass: 'bg-emerald-400' },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const { user } = useUser();

  const isSidebarOpen = isExpanded || isHovered || isMobileOpen;

  const profileName = user?.fullName ?? 'Courtney Henry';
  const profileEmail
    = user?.primaryEmailAddress?.emailAddress ?? 'courtney@example.com';
  const avatarUrl = user?.imageUrl ?? '/images/user/user-01.jpg';

  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className={`fixed top-0 left-0 z-50 mt-16 flex h-screen flex-col border-r border-slate-200 bg-white px-4 text-slate-900 transition-all duration-300 ease-in-out lg:mt-0 dark:border-slate-800 dark:bg-slate-900 
        ${
    isSidebarOpen ? 'w-[290px]' : 'w-[90px]'
    }
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-full flex-col pt-8 pb-6">
        <ProfileCard
          avatarUrl={avatarUrl}
          email={profileEmail}
          isSidebarOpen={isSidebarOpen}
          name={profileName}
        />

        <div className="mt-6 no-scrollbar flex-1 overflow-y-auto pb-6">
          <SectionHeading isSidebarOpen={isSidebarOpen} title="Menu" />
          <ul className="space-y-1">
            {primaryNavItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className={`group flex items-center gap-3 rounded-2xl px-1 py-2 text-sm font-medium transition ${
                      isSidebarOpen ? 'justify-start' : 'justify-center'
                    } ${
                      active
                        ? 'bg-slate-900 text-white dark:bg-white/10'
                        : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/70'
                    }`}
                  >
                    <span
                      className={`${isSidebarOpen ? 'ml-2' : ''} flex h-10 w-10 items-center justify-center rounded-2xl border text-base ${
                        active
                          ? 'border-transparent bg-white/20 text-white dark:bg-white/10'
                          : 'border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {item.icon}
                    </span>
                    {isSidebarOpen && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 space-y-3">
            <div
              className={`flex items-center ${
                isSidebarOpen ? 'justify-between' : 'justify-center'
              }`}
            >
              <SectionHeading isSidebarOpen={isSidebarOpen} title="My Projects" />
              {isSidebarOpen
                ? (
                    <button type="button" className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200">
                      + Add
                    </button>
                  )
                : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-xl font-semibold text-slate-500 dark:bg-slate-800 dark:text-white">
                      +
                    </div>
                  )}
            </div>
            <ul className="space-y-2">
              {projectItems.map(project => (
                <li
                  key={project.label}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-200 ${
                    isSidebarOpen ? 'justify-start' : 'justify-center'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-2.5 w-2.5 rounded-full ${project.colorClass}`}
                  />
                  {isSidebarOpen && <span className="truncate">{project.label}</span>}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 space-y-3">
            <SectionHeading isSidebarOpen={isSidebarOpen} title="Settings" />
            <Link
              href="/dashboard2/blank"
              prefetch={false}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/70 ${
                isSidebarOpen ? 'justify-start' : 'justify-center'
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-300">
                <BoxCubeIcon />
              </span>
              {isSidebarOpen && <span>Workspace settings</span>}
            </Link>
          </div>
        </div>

        <InviteCard isSidebarOpen={isSidebarOpen} />
      </div>
    </aside>
  );
};

type ProfileCardProps = {
  avatarUrl: string;
  email: string;
  isSidebarOpen: boolean;
  name: string;
};

function ProfileCard({
  avatarUrl,
  email,
  isSidebarOpen,
  name,
}: ProfileCardProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-2 shadow-[0_15px_40px_-25px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-800/60 ${
        isSidebarOpen ? '' : 'justify-center'
      }`}
    >
      <div className="relative">
        <Image
          src={avatarUrl}
          alt={name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-2xl object-cover"
          unoptimized
        />
        <span className="absolute -right-1 -bottom-1 inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-emerald-400 dark:border-slate-800" />
      </div>
      {isSidebarOpen && (
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-300">{email}</p>
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-emerald-600 uppercase dark:bg-emerald-500/15 dark:text-emerald-200">
            Online
          </span>
        </div>
      )}
    </div>
  );
}

type SectionHeadingProps = {
  isSidebarOpen: boolean;
  title: string;
};

function SectionHeading({ isSidebarOpen, title }: SectionHeadingProps) {
  return (
    <h2
      className={`mb-3 flex text-xs font-semibold tracking-wide text-slate-400 uppercase ${
        isSidebarOpen ? 'justify-start' : 'justify-center'
      }`}
    >
      {/* {isSidebarOpen ? title : <HorizontaLDots />} */}
      {isSidebarOpen ? title : ''}
    </h2>
  );
}

type InviteCardProps = {
  isSidebarOpen: boolean;
};

function InviteCard({ isSidebarOpen }: InviteCardProps) {
  return (
    <div
      className={`mt-auto rounded-3xl bg-linear-to-br from-purple-500 via-indigo-500 to-sky-500 p-4 text-white shadow-purple-500/40 ${
        isSidebarOpen ? '' : 'flex items-center justify-center'
      }`}
    >
      {isSidebarOpen
        ? (
            <div className="space-y-3 text-sm">
              <p className="text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
                Prodify
              </p>
              <p className="text-base font-semibold">
                New members will gain access to public spaces, docs, and dashboards.
              </p>
              <button type="button" className="w-full rounded-2xl bg-white/20 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/30">
                + Invite people
              </button>
            </div>
          )
        : (
            <span className="text-lg font-semibold">+</span>
          )}
    </div>
  );
}

export default AppSidebar;
