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

import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Progress} from "@/components/ui/progress";
import {ATSIssue, ATSResult, ATSSuggestion} from "@/generated/prisma/client";

interface ATSResultProps extends ATSResult {
  suggestions: ATSSuggestion[];
  issues: ATSIssue[];
}

const ATSResults = ({ats}: {ats: ATSResultProps}) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardHeader>
        <CardTitle>ATS Result</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto whitespace-pre-line leading-relaxed space-y-3 text-sm text-foreground/90">
        <div className="grid md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>ATS Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {ats?.atsScore.toFixed(2) ?? 0}
              </div>
              <Progress value={ats?.atsScore ?? 0} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Keyword Match</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">
                {ats?.keywordMatch.toFixed(2) ?? 0}%
              </div>
              <Progress value={ats?.keywordMatch ?? 0} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Formatting Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">
                {ats?.formattingScore.toFixed(2) ?? 0}%
              </div>
              <Progress value={ats?.formattingScore ?? 0} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Section Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">
                {ats?.sectionScore.toFixed(2) ?? 0}%
              </div>
              <Progress value={ats?.sectionScore ?? 0} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pass Probability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">
                {ats?.passProbability.toFixed(2) ?? 0}%
              </div>
              <Progress value={ats?.passProbability ?? 0} />
            </CardContent>
          </Card>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Score Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: "ATS Score",
                      value: ats?.atsScore ?? 0,
                    },
                    {
                      name: "Keyword Match",
                      value: ats?.keywordMatch ?? 0,
                    },
                    {
                      name: "Formatting Score",
                      value: ats?.formattingScore ?? 0,
                    },
                    {
                      name: "Section Score",
                      value: ats?.sectionScore ?? 0,
                    },
                    {
                      name: "Pass Probability",
                      value: ats?.passProbability ?? 0,
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
                      name: "ATS Score",
                      value: ats?.atsScore ?? 0,
                    },
                    {
                      name: "Keyword Match",
                      value: ats?.keywordMatch ?? 0,
                    },
                    {
                      name: "Formatting Score",
                      value: ats?.formattingScore ?? 0,
                    },
                    {
                      name: "Section Score",
                      value: ats?.sectionScore ?? 0,
                    },
                    {
                      name: "Pass Probability",
                      value: ats?.passProbability ?? 0,
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
        <Tabs defaultValue="suggestions" className="mt-5">
          <TabsList className="flex-wrap mb-10">
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
          </TabsList>
          <TabsContent value="suggestions">
            {ats?.suggestions.length > 0 ? (
              <div className="space-y-4">
                {ats.suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="border rounded-md p-4 shadow-sm bg-background"
                  >
                    <div className="text-sm text-foreground">
                      {suggestion.content}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center pt-2">
                No ats suggestions available
              </p>
            )}
          </TabsContent>
          <TabsContent value="issues">
            {ats?.issues.length > 0 ? (
              <div className="space-y-4">
                {ats.issues.map((issue) => (
                  <div
                    key={issue.id}
                    className="border rounded-md p-4 shadow-sm bg-background"
                  >
                    <div className="text-sm text-foreground">
                      {issue.content}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center pt-2">
                No ats issues available
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ATSResults;
