"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, AlertCircle, TrendingUp, Clock, MessageSquare } from "lucide-react"
import Link from "next/link"

// Mock data
const conversationSummaries = [
    {
        id: 1,
        date: "2024년 12월 24일",
        time: "오후 2시 30분",
        duration: "12분",
        mood: "positive",
        summary:
            "어머니께서 오늘 날씨가 좋다고 말씀하시며 즐거워하셨습니다. 손주들 이야기를 하시며 웃으셨고, 건강 상태는 양호해 보입니다.",
        keywords: ["날씨", "손주", "긍정적"],
    },
    {
        id: 2,
        date: "2024년 12월 23일",
        time: "오전 10시 15분",
        duration: "8분",
        mood: "neutral",
        summary: "평소와 같은 일상 대화를 나누셨습니다. 점심 메뉴에 대해 이야기하시고 TV 프로그램을 시청하셨다고 합니다.",
        keywords: ["식사", "TV", "일상"],
    },
    {
        id: 3,
        date: "2024년 12월 22일",
        time: "오후 4시 45분",
        duration: "15분",
        mood: "concerned",
        summary: "허리 통증을 언급하셨습니다. 약을 드셨는지 확인이 필요할 수 있습니다. 전반적으로는 밝은 모습이셨습니다.",
        keywords: ["건강", "통증", "약"],
    },
]

const healthAlerts = [
    {
        id: 1,
        type: "warning",
        message: "3일 연속 통증 관련 단어가 감지되었습니다",
        date: "2024년 12월 24일",
    },
    {
        id: 2,
        type: "info",
        message: "대화 빈도가 지난주 대비 증가했습니다",
        date: "2024년 12월 23일",
    },
]

const keywordTrends = [
    { word: "통증", count: 5, trend: "up" },
    { word: "손주", count: 8, trend: "stable" },
    { word: "날씨", count: 12, trend: "up" },
    { word: "식사", count: 10, trend: "down" },
]

export default function GuardianDashboardPage() {
    const [selectedTab, setSelectedTab] = useState("overview")

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b bg-card">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <Button variant="ghost" size="icon">
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold">보호자 대시보드</h1>
                                <p className="text-sm text-muted-foreground">어머니 모니터링</p>
                            </div>
                        </div>
                        <Badge className="bg-green-600 text-white border-none px-3 py-1 text-sm">
                            활성
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
                    <TabsList className="grid w-full max-w-md grid-cols-3">
                        <TabsTrigger value="overview">개요</TabsTrigger>
                        <TabsTrigger value="conversations">대화 내역</TabsTrigger>
                        <TabsTrigger value="insights">분석</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <Card className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">총 대화 수</p>
                                        <p className="text-3xl font-bold mt-1">24</p>
                                        <p className="text-xs text-green-600 mt-1">이번 주 +3</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <MessageSquare className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">평균 시간</p>
                                        <p className="text-3xl font-bold mt-1">11분</p>
                                        <p className="text-xs text-muted-foreground mt-1">대화당</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-accent/50 flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-accent-foreground" />
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">전반적 기분</p>
                                        <p className="text-3xl font-bold mt-1">긍정적</p>
                                        <p className="text-xs text-green-600 mt-1">85% 긍정적</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Health Alerts */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-primary-dark" />
                                건강 알림
                            </h3>
                            <div className="space-y-3">
                                {healthAlerts.map((alert) => (
                                    <div
                                        key={alert.id}
                                        className={`p-4 rounded-xl border-2 ${alert.type === "warning" ? "bg-red-50 border-red-400" : "bg-blue-50 border-blue-400"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className={`font-bold text-lg ${alert.type === "warning" ? "text-red-950" : "text-blue-950"}`}>
                                                    {alert.message}
                                                </p>
                                                <p className="text-sm text-muted-foreground mt-1">{alert.date}</p>
                                            </div>
                                            <Badge className={alert.type === "warning" ? "bg-red-600 text-white" : "bg-blue-600 text-white"}>
                                                {alert.type === "warning" ? "경고" : "정보"}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Recent Conversations */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">최근 대화</h3>
                            <div className="space-y-4">
                                {conversationSummaries.slice(0, 2).map((convo) => (
                                    <div key={convo.id} className="border-b last:border-0 pb-4 last:pb-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-3 h-3 rounded-full ${convo.mood === "positive"
                                                        ? "bg-green-500"
                                                        : convo.mood === "concerned"
                                                            ? "bg-orange-500"
                                                            : "bg-gray-400"
                                                        }`}
                                                />
                                                <div>
                                                    <p className="font-medium">{convo.date}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {convo.time} • {convo.duration}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm leading-relaxed text-muted-foreground mb-2">{convo.summary}</p>
                                        <div className="flex gap-2">
                                            {convo.keywords.map((keyword, idx) => (
                                                <Badge key={idx} className="text-xs bg-primary text-white border-none px-2 py-0.5">
                                                    {keyword}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button
                                className="w-full mt-4 bg-primary text-white hover:bg-primary-hover font-bold"
                                onClick={() => setSelectedTab("conversations")}
                            >
                                모든 대화 보기
                            </Button>
                        </Card>
                    </TabsContent>

                    {/* Conversations Tab */}
                    <TabsContent value="conversations" className="space-y-4">
                        {conversationSummaries.map((convo) => (
                            <Card key={convo.id} className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-4 h-4 rounded-full ${convo.mood === "positive"
                                                ? "bg-green-500"
                                                : convo.mood === "concerned"
                                                    ? "bg-orange-500"
                                                    : "bg-gray-400"
                                                }`}
                                        />
                                        <div>
                                            <p className="font-semibold text-lg">{convo.date}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {convo.time} • {convo.duration}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant={
                                            convo.mood === "positive" ? "default" : convo.mood === "concerned" ? "destructive" : "secondary"
                                        }
                                    >
                                        {convo.mood === "positive" ? "긍정적" : convo.mood === "concerned" ? "우려" : "보통"}
                                    </Badge>
                                </div>
                                <p className="text-sm leading-relaxed mb-3">{convo.summary}</p>
                                <div className="flex gap-2">
                                    {convo.keywords.map((keyword, idx) => (
                                        <Badge key={idx} className="text-xs bg-secondary text-white border-none">
                                            {keyword}
                                        </Badge>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </TabsContent>

                    {/* Insights Tab */}
                    <TabsContent value="insights" className="space-y-6">
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4 text-primary-dark">키워드 트렌드</h3>
                            <div className="space-y-4">
                                {keywordTrends.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-primary text-white border-none">{item.word}</Badge>
                                            <span className="text-sm font-semibold text-[#4A5D23]">{item.count}회 언급</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {item.trend === "up" && (
                                                <div className="flex items-center gap-1 text-green-600">
                                                    <TrendingUp className="w-4 h-4" />
                                                    <span className="text-xs">증가</span>
                                                </div>
                                            )}
                                            {item.trend === "down" && (
                                                <div className="flex items-center gap-1 text-red-600">
                                                    <TrendingUp className="w-4 h-4 rotate-180" />
                                                    <span className="text-xs">감소</span>
                                                </div>
                                            )}
                                            {item.trend === "stable" && <span className="text-xs text-muted-foreground">안정</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4 text-primary-dark">기분 분포</h3>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm">긍정적</span>
                                        <span className="text-sm font-medium">85%</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500" style={{ width: "85%" }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm">보통</span>
                                        <span className="text-sm font-medium">10%</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-gray-400" style={{ width: "10%" }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm">우려</span>
                                        <span className="text-sm font-medium">5%</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-500" style={{ width: "5%" }} />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 bg-primary/5 border-primary/20">
                            <h3 className="text-lg font-semibold mb-2 text-primary-dark">AI 분석 요약</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                지난 7일간의 대화를 분석한 결과, 어르신께서 전반적으로 좋은 상태를 유지하고 계십니다. 다만 신체적
                                불편함에 대한 반복적인 언급이 있어 건강 검진을 고려해보시는 것이 좋겠습니다. 가족 구성원에 대한 언급이
                                많아 사회적 교류가 활발한 것으로 보입니다.
                            </p>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
