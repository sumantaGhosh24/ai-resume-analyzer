"use client";

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

import {PrimaryBadge} from "@/components/primary-badge";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Progress} from "@/components/ui/progress";

import {useSuspenseResume} from "../hooks/use-resume";

interface FinalAnalysisProps {
  resumeId: string;
}

const FinalAnalysis = ({resumeId}: FinalAnalysisProps) => {
  const {data: resume} = useSuspenseResume(resumeId);

  return (
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
            {resume?.analysis && resume?.analysis?.missingSkills.length > 0 ? (
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
  );
};

export default FinalAnalysis;
