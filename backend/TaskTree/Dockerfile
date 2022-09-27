#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["TaskTree/TaskTree.csproj", "TaskTree/"]
RUN dotnet restore "TaskTree/TaskTree.csproj"
COPY . .
WORKDIR "/src/TaskTree"
RUN dotnet build "TaskTree.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TaskTree.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS development
WORKDIR /src/TaskTree
ENTRYPOINT ["dotnet", "watch"]

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TaskTree.dll"]