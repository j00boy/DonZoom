package com.example.donzoom.dto.stock.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StockSimpleResponseDto {

  private List<StockDetailResponseDto> stocks;

}
