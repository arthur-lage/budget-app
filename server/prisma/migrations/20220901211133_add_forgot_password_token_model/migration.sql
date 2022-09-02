-- CreateTable
CREATE TABLE "ForgotPasswordToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresIn" INTEGER NOT NULL DEFAULT 600,

    CONSTRAINT "ForgotPasswordToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ForgotPasswordToken" ADD CONSTRAINT "ForgotPasswordToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
