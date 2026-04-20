"use client";

import {ReactNode} from "react";
import Link from "next/link";
import {
  Bar,
  BarChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {formatDistanceToNowStrict} from "date-fns";
import {AlertTriangleIcon} from "lucide-react";

import {usePrimaryColor} from "@/components/primary-provider";
import {
  EmptyView,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";
import {ScrollArea} from "@/components/ui/scroll-area";

import {
  useSuspenseATS,
  useSuspenseCoverLetter,
  useSuspenseResume,
  useSuspenseRewrittenResume,
} from "../hooks/use-resumes";
import ATSResults from "./ats-results";
import CreateATSForm from "./creae-ats";
import RewrittenResume from "./rewritten-resume";
import CreateRewrittenResume from "./create-rewritten-resume";
import CoverLetter from "./cover-letter";
import CreateCoverLetter from "./create-cover-letter";

export const ResumeLoading = () => {
  return <LoadingView message="Loading resume..." />;
};

export const ResumeError = () => {
  return <ErrorView message="Error loading resume" />;
};

export const ResumeEmpty = () => {
  return <EmptyView message="No resume found" />;
};

export const PrimaryBadge = ({children}: {children: ReactNode}) => {
  const {primaryColor} = usePrimaryColor();

  return (
    <Badge className={`bg-${primaryColor}-700 uppercase dark:text-white`}>
      {children}
    </Badge>
  );
};

export const Resume = ({resumeId}: {resumeId: string}) => {
  const {data: resume} = useSuspenseResume(resumeId);

  const {data: ats} = useSuspenseATS(resumeId);

  const {data: rewritten} = useSuspenseRewrittenResume(resumeId);

  const {data: coverLetter} = useSuspenseCoverLetter(resumeId);

  const {primaryColor} = usePrimaryColor();

  return (
    <div className="p-6 container mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Resume Analysis</h1>
          <div className="text-muted-foreground font-mono text-xs mt-1">
            Resume ID: <span className="font-medium">{resume.id}</span>
          </div>
          <div className="text-muted-foreground font-mono text-xs">
            Job Description ID:{" "}
            <span className="font-medium">{resume?.analysis?.job?.id}</span>
          </div>
          <div className="text-muted-foreground font-mono text-xs">
            Analysis ID:{" "}
            <span className="font-medium">{resume?.analysis?.id}</span>
          </div>
        </div>
        {resume.fileUrl && (
          <Button
            asChild
            className={`bg-${primaryColor}-700 hover:bg-${primaryColor}-800 text-white`}
          >
            <Link
              href={resume.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume PDF
            </Link>
          </Button>
        )}
      </div>
      {(resume?.analysis?.status === "PENDING" ||
        resume?.analysis?.status === "PROCESSING") && (
        <Alert>
          <Spinner />
          <AlertTitle>Processing!</AlertTitle>
          <AlertDescription>
            This Resume Analyse is under processing, values might changed after
            processing!
          </AlertDescription>
        </Alert>
      )}
      {resume?.analysis?.status === "FAILED" && (
        <Alert>
          <AlertTriangleIcon />
          <AlertTitle>Failed!</AlertTitle>
          <AlertDescription>
            This Resume Analyse is failed, try again later!
          </AlertDescription>
        </Alert>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="overflow-hidden flex flex-col h-full">
          <CardHeader>
            <CardTitle>Resume Preview</CardTitle>
            <div className="text-xs text-muted-foreground break-all font-mono">
              {resume.fileName}
            </div>
            <div className="flex text-xs text-muted-foreground gap-2 mt-1">
              <span>
                Uploaded:{" "}
                {resume.createdAt
                  ? formatDistanceToNowStrict(resume.createdAt, {
                      addSuffix: true,
                    })
                  : "N/A"}
              </span>
              <span>·</span>
              <span>
                Updated:{" "}
                {resume.updatedAt
                  ? formatDistanceToNowStrict(resume.updatedAt, {
                      addSuffix: true,
                    })
                  : "N/A"}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            {resume.fileUrl ? (
              <iframe
                src={resume.fileUrl}
                title="Resume PDF Preview"
                className="w-full h-[650px] rounded border bg-background"
              />
            ) : (
              <p className="text-center text-muted-foreground pt-8">
                No preview available
              </p>
            )}
            <Tabs defaultValue="skills" className="mt-5">
              <TabsList className="flex-wrap mb-10">
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="experiences">Experiences</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="educations">Educations</TabsTrigger>
              </TabsList>
              <TabsContent value="skills">
                <div className="mt-2 flex flex-wrap gap-2">
                  {resume.skills.length > 0 ? (
                    resume.skills.map((skill) => (
                      <PrimaryBadge key={skill.id}>{skill.name}</PrimaryBadge>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground pt-8">
                      No skills available
                    </p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="experiences">
                {resume.experiences.length > 0 ? (
                  <ScrollArea className="h-[300px]">
                    <ul className="space-y-6">
                      {resume.experiences.map((exp) => (
                        <li
                          key={exp.id}
                          className="border-b pb-4 last:border-b-0"
                        >
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <div>
                              <span className="font-medium text-foreground text-base block">
                                {exp.title}
                              </span>
                              <span className="text-muted-foreground text-sm block">
                                {exp.company}
                              </span>
                            </div>
                            {exp.years && (
                              <span className="text-muted-foreground text-xs mt-1 md:mt-0">
                                {exp.years} {exp.years === 1 ? "year" : "years"}
                              </span>
                            )}
                          </div>
                          {exp.bullets && exp.bullets.length > 0 && (
                            <ul className="list-disc pl-5 text-sm text-muted-foreground mt-2 space-y-1">
                              {exp.bullets.map((bullet) => (
                                <li key={bullet.id} className="leading-relaxed">
                                  {bullet.content}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                ) : (
                  <p className="text-center text-muted-foreground pt-8">
                    No experiences available
                  </p>
                )}
              </TabsContent>
              <TabsContent value="projects">
                {resume.projects && resume.projects.length > 0 ? (
                  <ScrollArea className="h-[300px]">
                    <ul className="space-y-4">
                      {resume.projects.map((project) => (
                        <li
                          key={project.id}
                          className="border-b pb-3 last:border-b-0"
                        >
                          <div className="flex items-center mb-1">
                            <span className="font-medium text-foreground text-base">
                              {project.name}
                            </span>
                          </div>
                          {project.bullets && project.bullets.length > 0 && (
                            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                              {project.bullets.map((bullet) => (
                                <li key={bullet.id} className="leading-relaxed">
                                  {bullet.content}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                ) : (
                  <p className="text-center text-muted-foreground pt-8">
                    No projects available
                  </p>
                )}
              </TabsContent>
              <TabsContent value="educations">
                {resume.education.length > 0 ? (
                  <ul className="space-y-4">
                    {resume.education.map((edu) => (
                      <li
                        key={edu.id}
                        className="border-b pb-3 last:border-b-0 flex flex-col md:flex-row md:items-center md:justify-between"
                      >
                        <div>
                          <span className="font-medium text-foreground block">
                            {edu.degree}
                          </span>
                          <span className="text-muted-foreground text-sm block">
                            {edu.institute}
                          </span>
                        </div>
                        <span className="text-xs text-right mt-2 md:mt-0 text-muted-foreground whitespace-nowrap">
                          {edu.year}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-muted-foreground pt-8">
                    No educations available
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="overflow-hidden flex flex-col h-full">
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto whitespace-pre-line leading-relaxed space-y-3 text-sm text-foreground/90">
            <p>{resume.analysis?.job?.content}</p>
            <Tabs defaultValue="required-skills" className="mt-5">
              <TabsList className="flex-wrap mb-10">
                <TabsTrigger value="required-skills">
                  Required Skills
                </TabsTrigger>
                <TabsTrigger value="preferred-skills">
                  Preferred Skills
                </TabsTrigger>
                <TabsTrigger value="responsibilities">
                  Responsibilities
                </TabsTrigger>
                <TabsTrigger value="seniority">Seniority</TabsTrigger>
              </TabsList>
              <TabsContent value="required-skills">
                {resume?.analysis &&
                resume?.analysis?.job?.requiredSkills.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {resume.analysis.job.requiredSkills.map((skill) => (
                      <PrimaryBadge key={skill.id}>{skill.name}</PrimaryBadge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center pt-2">
                    No required skills listed for this job
                  </p>
                )}
              </TabsContent>
              <TabsContent value="preferred-skills">
                {resume?.analysis &&
                resume?.analysis?.job?.preferredSkills.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {resume.analysis.job.preferredSkills.map((skill) => (
                      <PrimaryBadge key={skill.id}>{skill.name}</PrimaryBadge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center pt-2">
                    No preferred skills listed for this job
                  </p>
                )}
              </TabsContent>
              <TabsContent value="responsibilities">
                {resume?.analysis &&
                resume?.analysis?.job?.responsibilities.length > 0 ? (
                  <ScrollArea className="h-[300px]">
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      {resume.analysis.job.responsibilities.map(
                        (resp: {id: string; content: string}) => (
                          <li key={resp.id}>{resp.content}</li>
                        ),
                      )}
                    </ul>
                  </ScrollArea>
                ) : (
                  <p className="text-muted-foreground text-center pt-2">
                    No responsibilities listed for this job
                  </p>
                )}
              </TabsContent>
              <TabsContent value="seniority">
                <div className="mt-2">
                  {resume?.analysis?.job?.seniority ? (
                    <PrimaryBadge>{resume.analysis.job.seniority}</PrimaryBadge>
                  ) : (
                    <p className="text-muted-foreground">
                      No seniority specified for this job
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <Card className="overflow-hidden flex flex-col h-full">
        <CardHeader>
          <CardTitle>Final Analysis</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto whitespace-pre-line leading-relaxed space-y-3 text-sm text-foreground/90">
          <div className="grid md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {resume.analysis?.score?.totalScore.toFixed(2) ?? 0}
                </div>
                <Progress value={resume.analysis?.score?.totalScore ?? 0} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Skill Match</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl">
                  {resume.analysis?.score?.skillMatch.toFixed(2) ?? 0}%
                </div>
                <Progress value={resume.analysis?.score?.skillMatch ?? 0} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Experience Match</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl">
                  {resume.analysis?.score?.seniorityMatch.toFixed(2) ?? 0}%
                </div>
                <Progress value={resume.analysis?.score?.seniorityMatch ?? 0} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Project Match</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl">
                  {resume.analysis?.score?.projectMatch.toFixed(2) ?? 0}%
                </div>
                <Progress value={resume.analysis?.score?.projectMatch ?? 0} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Responsibility Match</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl">
                  {resume.analysis?.score?.responsibilityMatch.toFixed(2) ?? 0}%
                </div>
                <Progress
                  value={resume.analysis?.score?.responsibilityMatch ?? 0}
                />
              </CardContent>
            </Card>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Match Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        name: "Skill",
                        value: resume.analysis?.score?.skillMatch ?? 0,
                      },
                      {
                        name: "Project",
                        value: resume.analysis?.score?.projectMatch ?? 0,
                      },
                      {
                        name: "Responsibility",
                        value: resume.analysis?.score?.responsibilityMatch ?? 0,
                      },
                      {
                        name: "Seniority",
                        value: resume.analysis?.score?.seniorityMatch ?? 0,
                      },
                    ]}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Radar Analysis</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={[
                      {
                        name: "Skill",
                        value: resume.analysis?.score?.skillMatch ?? 0,
                      },
                      {
                        name: "Project",
                        value: resume.analysis?.score?.projectMatch ?? 0,
                      },
                      {
                        name: "Responsibility",
                        value: resume.analysis?.score?.responsibilityMatch ?? 0,
                      },
                      {
                        name: "Seniority",
                        value: resume.analysis?.score?.seniorityMatch ?? 0,
                      },
                    ]}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <Radar dataKey="value" fill="#4f46e5" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="summary" className="mt-5">
            <TabsList className="flex-wrap mb-10">
              <TabsTrigger value="summary">Profile Summary</TabsTrigger>
              <TabsTrigger value="skills-suggestions">
                Skills Suggestions
              </TabsTrigger>
              <TabsTrigger value="experience-suggestions">
                Experience Suggestions
              </TabsTrigger>
              <TabsTrigger value="project-suggestions">
                Projects Suggestions
              </TabsTrigger>
              <TabsTrigger value="missing-skills">Missing Skills</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
              {resume?.analysis?.suggestions &&
              resume.analysis.suggestions.filter((s) => s.type === "SUMMARY")
                .length > 0 ? (
                <div className="space-y-4">
                  {resume.analysis.suggestions
                    .filter((suggestion) => suggestion.type === "SUMMARY")
                    .map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="border rounded-md p-4 shadow-sm bg-background"
                      >
                        <div className="mb-2">
                          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-600 text-white uppercase">
                            Profile Summary
                          </span>
                        </div>
                        <div className="text-sm text-foreground">
                          {suggestion.content}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center pt-2">
                  No summary suggestions available
                </p>
              )}
            </TabsContent>
            <TabsContent value="skills-suggestions">
              {resume?.analysis?.suggestions &&
              resume.analysis.suggestions.filter((s) => s.type === "SKILLS")
                .length > 0 ? (
                <div className="space-y-4">
                  {resume.analysis.suggestions
                    .filter((suggestion) => suggestion.type === "SKILLS")
                    .map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="border rounded-md p-4 shadow-sm bg-background"
                      >
                        <div className="mb-2">
                          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-600 text-white uppercase">
                            Skill
                          </span>
                        </div>
                        <div className="text-sm text-foreground">
                          {suggestion.content}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center pt-2">
                  No skill suggestions available
                </p>
              )}
            </TabsContent>
            <TabsContent value="experience-suggestions">
              {resume?.analysis?.suggestions &&
              resume.analysis.suggestions.filter((s) => s.type === "EXPERIENCE")
                .length > 0 ? (
                <div className="space-y-4">
                  {resume.analysis.suggestions
                    .filter((suggestion) => suggestion.type === "EXPERIENCE")
                    .map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="border rounded-md p-4 shadow-sm bg-background"
                      >
                        <div className="mb-2">
                          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-orange-500 text-white uppercase">
                            Experience Highlight
                          </span>
                        </div>
                        <div className="text-sm text-foreground">
                          {suggestion.content}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center pt-2">
                  No experience suggestions available
                </p>
              )}
            </TabsContent>
            <TabsContent value="project-suggestions">
              {resume?.analysis?.suggestions &&
              resume.analysis.suggestions.filter((s) => s.type === "PROJECT")
                .length > 0 ? (
                <div className="space-y-4">
                  {resume.analysis.suggestions
                    .filter((suggestion) => suggestion.type === "PROJECT")
                    .map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="border rounded-md p-4 shadow-sm bg-background"
                      >
                        <div className="mb-2">
                          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-violet-500 text-white uppercase">
                            Project
                          </span>
                        </div>
                        <div className="text-sm text-foreground">
                          {suggestion.content}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center pt-2">
                  No project suggestions available
                </p>
              )}
            </TabsContent>
            <TabsContent value="missing-skills">
              {resume?.analysis &&
              resume?.analysis?.missingSkills.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {resume.analysis.missingSkills.map((skill) => (
                    <PrimaryBadge key={skill.id}>{skill.name}</PrimaryBadge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center pt-2">
                  No missing skills found
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {ats ? (
        <ATSResults ats={ats} />
      ) : (
        <CreateATSForm
          resumeId={resume.id}
          jdId={resume?.analysis?.job?.id as string}
          analyseId={resume?.analysis?.id as string}
        />
      )}
      {rewritten ? (
        <RewrittenResume rewritten={rewritten} />
      ) : (
        <CreateRewrittenResume
          resumeId={resume.id}
          jdId={resume?.analysis?.job?.id as string}
          analyseId={resume?.analysis?.id as string}
        />
      )}
      {coverLetter ? (
        <CoverLetter coverLetter={coverLetter} />
      ) : (
        <CreateCoverLetter
          resumeId={resume.id}
          jdId={resume?.analysis?.job?.id as string}
          analyseId={resume?.analysis?.id as string}
        />
      )}
    </div>
  );
};
