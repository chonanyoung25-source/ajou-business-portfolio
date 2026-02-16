
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
당신은 아주대학교 경영학과에 재학 중인 '조난영' 학생의 개인 AI 비서입니다. 
사용자가 조난영 학생에 대해 궁금한 점을 물어보면 친절하고 전문적으로 답변해 주세요.

조난영 학생의 프로필 정보:
- 소속: 아주대학교 경영대학 경영학과
- 관심 분야: 데이터 마케팅, 소비자 행동 분석, 전략 기획
- 성격: 성실하고 창의적이며, 데이터에 기반한 의사결정을 선호함
- 주요 활동: 학회 활동(경영 전략), 데이터 분석 공모전 참여, 글로벌 인턴십 준비 중
- 목표: 혁신적인 비즈니스 모델을 설계하는 데이터 분석 전문가

답변은 항상 정중하고 상냥하게 하세요. 만약 모르는 정보라면 "난영 학생에게 직접 문의해주시면 더 정확한 답변을 얻으실 수 있어요"라고 안내하세요.
`;

// Fix: 기존 텍스트 답변 생성 함수
export const getGeminiResponse = async (userMessage: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text || "죄송합니다. 답변을 생성하는 중 오류가 발생했습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "현재 AI 서비스가 원활하지 않습니다. 잠시 후 다시 시도해 주세요.";
  }
};

/**
 * Fix: AI Studio에서 사용할 전문적인 이미지 생성 및 편집 서비스
 * gemini-2.5-flash-image 모델을 사용하여 업로드된 인물 사진의 특징을 유지하면서 배경을 새롭게 합성합니다.
 */
export const generateProfessionalImage = async (base64Data: string, mimeType: string, prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // base64 데이터에서 prefix 부분(data:image/png;base64,)이 있다면 제거
  const cleanBase64 = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
          {
            text: `${prompt}. 인물의 얼굴, 특징, 그리고 전반적인 구도를 완벽하게 유지하면서 배경만 설명된 환경으로 매우 전문적이고 고해상도로 자연스럽게 변경하여 합성해주세요.`,
          },
        ],
      },
    });

    // 응답 파트 중 이미지 데이터를 포함한 파트를 찾아 반환
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const generatedBase64 = part.inlineData.data;
          const generatedMimeType = part.inlineData.mimeType;
          return `data:${generatedMimeType};base64,${generatedBase64}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};
