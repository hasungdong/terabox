package com.terabox.demo.dtos;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
public class SearchDto {
    private String title;

    private int countPerPage = 4; // 한 페이지 당 보여줄 게시글 수
    private int requestPage;    // 요청한 페이지 번호
    private int totalCount;     // 전체 게시글의 개수
    private int maxPage;        // 조회할 수 있는 최대 페이지
    private int minPage = 1;    // 조회할 수 있는 최소 페이지
    private int offset;         // 거를 게시글 개수
}
